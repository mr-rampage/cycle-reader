import * as Rx from 'rxjs';

const supervisor = new Rx.Subject();

export const Supervisor = {
    onError: (error) => supervisor.next(error),
    error$: supervisor
};
