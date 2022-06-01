import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver, ComponentRef, EventEmitter,
  OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {DynamicCmpHostDirective} from "../dynamic-cmp-host/dynamic-cmp-host.directive";
import {DynamicCmpConfig} from "./dynamic-cmp-config";

@Component({
  selector: 'app-dynamic-component-renderer',
  styleUrls: ['./dynamic-component-renderer.component.scss'],
  template: `
    <ng-template appDynamicCmpHost>
    </ng-template>
  `
})
export class DynamicComponentRendererComponent implements OnInit,ICellRendererAngularComp, AfterContentInit {

  @ViewChild(DynamicCmpHostDirective, {static: true}) cmpHost!: DynamicCmpHostDirective;

  @Output()
  public clickEvent:EventEmitter<string> = new EventEmitter();

  params: DynamicCmpConfig;

  constructor() {}

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.cmpHost.viewContainerRef.clear();

    for (let component of this.params.components){

      const cmpRef: ComponentRef<any> = this.cmpHost.viewContainerRef.createComponent(component.component);
      cmpRef.instance.data = component.data;

      if (component?.data?.listeners?.handleClick){

        cmpRef.instance.clicked.subscribe( (event: any) => {
          this.clickEvent.emit(event);
        });

        component.data.listeners.handleClick(this);
      }
    }
  }

  agInit(params: any): void {
    this.params = params.dynamicComponentConfig(params);
  }

  refresh(params: any): boolean {
    return false;
  }



}
