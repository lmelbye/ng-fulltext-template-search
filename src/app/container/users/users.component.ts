import { Component, OnInit } from '@angular/core';
import { of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchService } from 'src/app/search.service';

interface User {
  id : number,
  name : string
  lastname : string
}

@Component({
  selector: 'search-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public searchService : SearchService) { }

  private _users : User[] = [
    { id : 0, name : 'John F.', lastname : 'Kennedy' },
    { id : 1, name : 'Abraham', lastname : 'Lincoln' },
    { id : 2, name : 'Bill', lastname : 'Gates' },
  ]

  users$ = of(this._users);

  ngOnInit(): void {
  }

}
