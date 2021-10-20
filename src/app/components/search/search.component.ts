import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ae-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output() title$ = new EventEmitter();

  timeOut: any = null;

  titleTiped(event: any) {
    if(this.timeOut) { clearTimeout(this.timeOut); }
    this.timeOut = setTimeout(() => {
      this.title$.emit(event.target.value)
    }, 700)
  }
}
