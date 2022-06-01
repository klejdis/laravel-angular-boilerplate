import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthService} from "./auth.service";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ],
  exports:[
  ],
  providers:[
    AuthService
  ]
})
export class AuthModule {

  constructor(@Optional() @SkipSelf() parentModule?: AuthModule) {
    if (parentModule) {
      throw new Error(
        'AuthModule is already loaded. Import it in the AppModule only');
    }
  }


  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
      ]
    };
  }
}
