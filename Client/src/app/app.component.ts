import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username = '';

  handleClick(value: string){
    console.log(value);
  }

  handleInput(val: any){
     this.username = val.target.value;
  }

}
