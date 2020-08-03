import { Component, Input, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Tasklist } from '../../../models/tasklist';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  @Input() completeTasksList: Array<Object>;
  public connectedTo : Array<string> = [];
  public showEditHeader = [];
  taskLists: Observable<Tasklist[]>;

  constructor(private dialogService : ConfirmDialogService,
    private dashboardService : DashboardService){;
  } 

  @ViewChildren('header_edit') input : QueryList<ElementRef>;

  ngOnInit(): void {
    console.log(this.completeTasksList);
    for(let i=0; i<this.completeTasksList.length; i++){
      this.showEditHeader[i] = false;
      this.connectedTo.push(this.completeTasksList[i]['name']);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  showEditPanel(i){
    this.showEditHeader[i] = true;
    console.log(this.input);
    this.input.forEach((element, index) => {
      if(i == index){
        console.log(element.nativeElement);
        setTimeout(() => {
          element.nativeElement.focus();
        },10);
      }
    });
  }

  updateName(value, i){
    this.showEditHeader[i] = false;
  }

  delete(name, type, task) {
    const options = {
      title: 'Confirm',
      message: 'Are you sure, you want to delete '+type,
      cancelText: 'CANCEL',
      confirmText: 'YES, DELETE'
    };
    
    this.dialogService.open(options);
        
    this.dialogService.confirmed().subscribe(confirmed => {
       if (confirmed) {
            this.actualDelete(name, type, task);
          }
        });
    }

  actualDelete(name, type, task) {
    if(type == "list"){
      this.completeTasksList.forEach( (element, index)=> {
        if(element['name'] == name){
          console.log(element);
          this.completeTasksList.splice(index, 1);
        }
      });
    }else {
      this.completeTasksList.forEach( (element, index)=> {
        if(element['name'] == name){
          element['list'].forEach((item,index) => {
            if(item == task){
              element['list'].splice(index, 1);
            }
          });
        }
      });
    }
    this.dashboardService.saveTaskList(this.completeTasksList);
  }

}
