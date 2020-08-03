import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  isVissible: boolean = true;
  name : string;
  @Input() type: string;
  @Input() listName: string;
  error: boolean = false;
  errorMsg: string = '';

  constructor(private dashboardService : DashboardService) { }

  ngOnInit(): void {
  }

  add(){
    console.log(this.name);
    if(this.name != "") {
      let tasklist = [];
      tasklist = this.dashboardService.getListObject();
      console.log(tasklist);
      console.log(this.type);
      if(this.type == 'List'){
        let listNameFlag = false;
        tasklist.forEach(elem => {
          if(elem['name'].toLowerCase() == this.name.toLowerCase()){
            this.error = true;
            this.errorMsg = "Name already exists..";
            listNameFlag = true;
          }
        });
        if(!listNameFlag){
          tasklist.push({'name': ''+this.name, list: []});
          this.isVissible = true;
          this.dashboardService.saveTaskList(tasklist);
          this.name = '';
          this.error = false;
          this.errorMsg = "";
        }
      } else {
        tasklist.forEach(item => {
          if(item.name == this.listName){
            let cardNameFlag = false;
            console.log(item['list']);
            item['list'].forEach(element => {
              console.log(element);
              console.log(this.name);
              if(element.toLowerCase() == this.name.toLowerCase()){
                this.error = true;
                this.errorMsg = "Name already exists..";
                cardNameFlag = true;
              }
            });
            if(!cardNameFlag){
              item['list'].push(''+this.name);
              this.isVissible = true;
              this.name = '';
              this.error = false;
              this.errorMsg = "";
            } 
          }
        });
        this.dashboardService.saveTaskList(tasklist);
      }
    } else {
      this.error = true;
      this.errorMsg = "Name is required";
    }
    
    
  }

  cancel(){
    this.isVissible = true;
    this.error = false;
    this.errorMsg = "";
  }


}
