import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appCan]'
})
export class CanDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set appCan(condition: { permission:string }) {
    console.log(condition)

    if (!condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (condition) {
      //this.viewContainer.clear();
    }
  }

}
