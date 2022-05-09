import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IconSetService} from "@coreui/icons-angular";
import {cilPencil, cilTrash} from "@coreui/icons";


@Component({
  selector: 'app-action-link',
  templateUrl: './action-link.component.html',
  styleUrls: ['./action-link.component.scss'],
  providers: [IconSetService],
})
export class ActionLinkComponent implements OnInit {

  @Input() data: any;

  @Output()
  public clicked:EventEmitter<string> = new EventEmitter();

  constructor(public iconSet: IconSetService) {
    // iconSet singleton
    iconSet.icons = { cilPencil , cilTrash};
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
