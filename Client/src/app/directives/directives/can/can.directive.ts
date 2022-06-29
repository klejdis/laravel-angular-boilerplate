import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Directive({
  selector: '[appCan]'
})
export class CanDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
  }

  @Input() set appCan(permission: { permission:string }) {

    this.authService.can(permission.permission).then(r=>{
      if ( r ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    })

  }

}
