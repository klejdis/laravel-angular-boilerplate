import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appDynamicCmpHost]'
})
export class DynamicCmpHostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) {
    
  }

}
