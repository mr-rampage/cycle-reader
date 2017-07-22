import { AppendableItemList } from './item-list';
import Rx from 'rxjs';

describe('AppendableItemList', () => {

  let fixture;
  let input$;

  beforeEach(() => {
    input$ = new Rx.Subject();
    fixture = AppendableItemList(input$)
  });

  it('should start with an empty list', () => {
    expect(fixture.component.childNodes.length).toBe(0);
  });

  it('should add an item from the input stream', () => {
    fixture.stream.subscribe(added => expect(added).toEqual({'added': 'foo'}));
    input$.next('foo');
    expect(fixture.component.childNodes.length).toBe(1);
  });

  it('should remove an item from the list on click', () => {
    input$.next('foo');
    fixture.stream.subscribe(removed => expect(removed).toEqual({'removed': 'foo'}));
    fixture.component.firstChild.click();
  });

});