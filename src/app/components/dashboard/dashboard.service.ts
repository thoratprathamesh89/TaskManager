import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Tasklist } from 'src/app/models/tasklist';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public taskListBehaviouralSubject = new BehaviorSubject([]);
  public tasklistArray: Array<Tasklist> = [];

  getTaskList() : Observable<Array<Tasklist>> {
    return this.http.get<Array<Tasklist>>("assets/tasklist.json"); 
  }

  getListObject(): Array<Tasklist>{
    this.taskListBehaviouralSubject.subscribe(data => {
      this.tasklistArray = data;
    });
    return this.tasklistArray;
  }

  saveTaskList(data) : Observable<any>{
    this.taskListBehaviouralSubject.next(data);
    this.tasklistArray = data;
    return new Observable((observer)=> {
      observer.next({
        "status": "success",
        "message": "saved successfully"
      });
    });
  }
}
