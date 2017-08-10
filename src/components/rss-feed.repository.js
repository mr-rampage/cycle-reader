import Rx from 'rxjs';

const rxReaderDB$ = RxReaderDB('rxReader', {'feeds': 'uri'});

export function RssFeedRepository(tablename) {
  return {
    Insert$: Insert$(tablename),
    FindAll$: FindAll(tablename)
  };
}

function RxReaderDB(name, schema) {
  return window.indexedDB ? IndexedDB$(name, schema) : Rx.Observable.empty();
}

function IndexedDB$(name, schema) {
  const db$ = new Rx.ReplaySubject();
  const request = window.indexedDB.open(name, 1);
  Rx.Observable.fromEvent(request, 'success').first().pluck('target', 'result')
    .subscribe(database => db$.next(database));
  Rx.Observable.fromEvent(request, 'upgradeneeded')
    .subscribe(event => initializeStore(event.target.result, schema));

  return db$;
}

function Insert$(table) {
  return function add(record) {
    return ObjectStore$(table, 'readwrite')
      .map(objectStore => objectStore.add(record))
      .flatMap(transaction => Rx.Observable.fromEvent(transaction, 'success'));
  }
}

function FindAll(table) {
  return function() {
    return ObjectStore$(table, 'read')
      .map(objectStore => objectStore.getAll())
      .flatMap(transaction => Rx.Observable.fromEvent(transaction, 'success'));
  }
}

function ObjectStore$(table, access) {
  return rxReaderDB$.map(database => database.transaction(table, access).objectStore(table));
}

function initializeStore(database, schema) {
  Object.keys(schema).forEach(tablename => {
    if (!database.objectStoreNames.contains(tablename)) {
      database.createObjectStore(tablename, {'keyPath': schema[tablename]});
    }
  });
}
