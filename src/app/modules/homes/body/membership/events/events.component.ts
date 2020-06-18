import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../communications/fe-backend-db/membership/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less']
})
export class EventsComponent implements OnInit {

  events = []
  constructor(private _eventService: EventService, private _router: Router) { }

  ngOnInit() {
    this._eventService.getEvents().subscribe(
      res => this.events = res,
      err => {
        if( err instanceof HttpErrorResponse){
          if(err.status === 401) {
            this._router.navigate(['/membership/login'])
          }
        }
      }
    )
  }

}
