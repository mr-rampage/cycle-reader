import { noop } from 'rxjs';
import { Supervisor } from './supervisor';
import * as Rx from 'rxjs';

export function RssSubscriber(next = noop) {
  return Rx.Subscriber.create(next, Supervisor.onError);
}