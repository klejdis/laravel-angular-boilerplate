import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {$e} from "@angular/compiler/src/chars";

@Component({
  selector: 'app-ag-search',
  templateUrl: './ag-search.component.html',
  styleUrls: ['./ag-search.component.scss'],
})
export class AgSearchComponent implements OnInit {

  @Output() onInput = new EventEmitter<string>();
  @Output() onSearch = new EventEmitter<any>();

  @Input() placeholder: string;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  onInputHandler($event: any) {
    this.onInput.emit($event.target.value);
  }

  onSearchHandler($event: MouseEvent) {
    this.onSearch.emit($event);
  }
}
