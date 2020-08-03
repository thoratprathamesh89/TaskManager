import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Tasklist } from '../../models/tasklist';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public tasklists$: Subject<Array<Tasklist>> = new Subject();
  public tasks : any = [];
  public tasklists : Array<Tasklist> = [];

  constructor( private dashboardService: DashboardService) {
  }


  ngOnInit(): void {
    this.dashboardService.getTaskList().subscribe(response => {
      this.tasklists$.next(response);
      this.tasklists = response;
      this.dashboardService.saveTaskList(response).subscribe(data => {
        console.log(data);
      });
  });
  }

}
