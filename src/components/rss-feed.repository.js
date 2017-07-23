import Rx from 'rxjs';

const rxReaderDB = RxReaderDB('rxReader');
const table = 'feeds';

export function RssFeedRepository() {
  rxReaderDB.subscribe(console.log);
}

function RxReaderDB(name) {
  return window.indexedDB ? IndexedDB$(name) : Rx.Observable.empty();
}

function IndexedDB$(name) {
  const db$ = new Rx.ReplaySubject();
  const request = window.indexedDB.open(name, 1);
  Rx.Observable.fromEvent(request, 'success').first().pluck('target', 'result')
    .subscribe(database => db$.next(database));
  return db$;
}

function add(addItem$) {
  addItem$.subscribe(item => {
    rxReaderDB.subscribe(database =>
      database.transaction(`[${table}]`, 'readwrite')
        .objectStore(table)
        .add(item));
  })
}
