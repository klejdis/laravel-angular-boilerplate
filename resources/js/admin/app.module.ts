import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './components/app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule
    ],
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ]
})
export class AppModule {}
