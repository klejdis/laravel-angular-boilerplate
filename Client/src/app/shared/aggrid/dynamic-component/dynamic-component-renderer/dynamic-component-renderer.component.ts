import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {DynamicCmpHostDirective} from "../dynamic-cmp-host/dynamic-cmp-host.directive";

export interface DynamicCmpConfig{
  component: any
}

@Component({
  selector: 'app-dynamic-component-renderer',
  // templateUrl: './dynamic-component-renderer.component.html',
  styleUrls: ['./dynamic-component-renderer.component.scss'],
  template: `
    <ng-template appDynamicCmpHost>
    </ng-template>
  `
})
export class DynamicComponentRendererComponent implements OnInit,ICellRendererAngularComp {

  @ViewChild(DynamicCmpHostDirective, {static: true}) cmpHost!: DynamicCmpHostDirective;

  params: any;

  constructor(
  ) {

  }

  ngOnInit() {
    this.cmpHost.viewContainerRef.clear();
    this.cmpHost.viewContainerRef.createComponent(this.params.component)
  }

  agInit(params: any): void {
    this.params = params.dynamicComponentConfig(params);
  }

  refresh(params: any): boolean {
    return true;
  }



}
