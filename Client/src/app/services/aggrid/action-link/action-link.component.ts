import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action-link',
  templateUrl: './action-link.component.html',
  styleUrls: ['./action-link.component.scss'],
})
export class ActionLinkComponent implements OnInit {

  @Input() data: any;

  @Output()
  public clicked:EventEmitter<string> = new EventEmitter();

  constructor(

  ) {
  }

  ngOnInit(): void {

  }

  refresh(params: any): boolean {
    return true;
  }

  handleClick($event: MouseEvent) {
    if (this.data.confirm){

      $event.stopPropagation();
      $event.preventDefault();

      if (confirm("Are you sure?")) {
        this.clicked.emit(this.data);
      }
    }
  }
}
