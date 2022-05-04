import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

export interface IRouterLinkRendererComponentOptions {
  routerLinkParams?: any[];
  linkDescription?: string;
  icon?:string,
  textOnly?: string;
  target?: string;
}

@Component({
  template: `
        <a *ngIf="params.textOnly == null; else textOnlyBlock"
           [routerLink]="params.routerLinkParams"
           [target]="params.target ? params.target : '_self'"
        >
            {{ params.linkDescription }}
        </a>

        <ng-template #textOnlyBlock>

          <svg cIcon [name]="params.icon"  title=""></svg>

          {{ params.textOnly }}
        </ng-template>
    `
})
export class RouterLinkRendererComponent implements ICellRendererAngularComp {
  params: IRouterLinkRendererComponentOptions;

  agInit(params: any): void {
    this.params = params.routerLinkRendererComponentOptions(params);
  }

  refresh(params: any): boolean {
    return true;
  }
}
