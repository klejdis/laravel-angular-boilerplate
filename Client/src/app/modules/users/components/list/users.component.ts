import { Component, OnInit } from "@angular/core";
import { UsersService} from "../../users.service";
import {User} from "../../models/user.interface";

@Component({
  selector: 'users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']

})
export class UsersComponent implements OnInit{

  users: User[] = [];

  constructor(private usersService: UsersService) {
  }
  ngOnInit() {
    this.usersService
      .getUsers()
      .subscribe((data:any) => {
        this.users = data.data
      });
  }
}
