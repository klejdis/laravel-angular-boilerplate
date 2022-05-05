import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {IconSetService} from "@coreui/icons-angular";
import {cilPencil, cilTrash} from "@coreui/icons";

export interface IRouterLinkRendererComponentOptions {
  routerLinkParams?: any[];
  linkDescription?: string;
  icon?:string,
  textOnly?: string;
  target?: string;
}

@Component({
  template: `
        <span *ngFor="let param of params">

          <a *ngIf="param.textOnly == null; else textOnlyBlock"
             [routerLink]="param.routerLinkParams"
             [target]="param.target ? param.target : '_self'"
             class="router-link-renderer"
          >

            <svg cIcon *ngIf="param.icon" [name]="param.icon"></svg>

            <ng-template [ngIf]="param.linkDescription">
              {{ param.linkDescription }}
            </ng-template>

          </a>

          <ng-template #textOnlyBlock>
            {{ param.textOnly }}
          </ng-template>

        </span>


    `,
  providers: [IconSetService],
})
export class RouterLinkRendererComponent implements ICellRendererAngularComp {

  constructor(public iconSet: IconSetService) {
    // iconSet singleton
    iconSet.icons = { cilPencil , cilTrash};
  }

  params: Array<IRouterLinkRendererComponentOptions>;

  agInit(params: any): void {
    this.params = params.routerLinkRendererComponentOptions(params);
  }

  refresh(params: any): boolean {
    return true;
  }
}
