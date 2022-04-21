import { Component } from "@angular/core";

@Component({
    selector: 'app-root',
    styleUrls: ['app.component.scss'],
    template: `
    <div class="app">
        <h1>{{ title }}</h1>

        <input
          type="text"
          [(ngModel)]="title"

        />
    </div>
  `,

})
export class AppComponent{
    title: string;

    constructor(){
        this.title = 'ultimate angular';
    }

}
