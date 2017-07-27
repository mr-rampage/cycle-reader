import Rx from 'rxjs';

const rxReaderDB$ = RxReaderDB('rxReader', {'feeds': 'uri'});

export function RssFeedRepository(tablename) {
  return {
    Insert$: Insert$(tablename)
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
    return rxReaderDB$
      .do(() => console.info('persisting', record))
      .flatMap(database => {
        const transaction = database.transaction(table, 'readwrite').objectStore(table).add(record);
        return Rx.Observable.fromEvent(transaction, 'success');
      });
  }
}

function initializeStore(database, schema) {
  Object.keys(schema).forEach(tablename => {
    if (!database.objectStoreNames.contains(tablename)) {
      database.createObjectStore(tablename, {'keyPath': schema[tablename]});
    }
  });
}
