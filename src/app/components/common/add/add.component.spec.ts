import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

import { AddComponent } from './add.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { DashboardService } from '../../dashboard/dashboard.service';
import { of } from 'rxjs';


describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let service: DashboardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule, HttpClientModule],
      declarations: [ AddComponent ],
      providers: [DashboardService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    service = TestBed.get(DashboardService);
    component = fixture.componentInstance;
    component.isVissible = true;
    fixture.detectChanges();
    spyOn(service, 'getListObject').and.callFake(() => {
      return [ {name:'todo', list:['test','test1']} ];
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call cancel method and must make isvissible true', ()=> {
    let element = fixture.debugElement.query(By.css('.cancel_btn'));
    spyOn(component, 'cancel').and.callThrough();
    element.triggerEventHandler('click', null);
    expect(component.cancel).toHaveBeenCalled();
    expect(component.isVissible).toBeTruthy();
  });

  it('should call add method and save list', ()=> {
    spyOn(service,'saveTaskList').and.callThrough();
    let elem = fixture.debugElement.query(By.css('.add_btn'));
    component.name = "test";
    component.type = "List";
    spyOn(component, 'add').and.callThrough();
    elem.triggerEventHandler('click', null);
    expect(component.error).not.toBeTruthy();
    expect(service.saveTaskList).toHaveBeenCalled();
  });

  it('should call add method and save card', () =>{
    spyOn(service,'saveTaskList').and.callThrough();
    let elem = fixture.debugElement.query(By.css('.add_btn'));
    component.name = "todo";
    component.type = "card";
    component.listName = "todo";
    spyOn(component, 'add').and.callThrough();
    elem.triggerEventHandler('click', null);
    expect(service.saveTaskList).toHaveBeenCalled();
  });

  it('should call add method for save card and throw duplicate error', () =>{
    let elem = fixture.debugElement.query(By.css('.add_btn'));
    component.name = "test";
    component.type = "card";
    component.listName = "todo";
    spyOn(component, 'add').and.callThrough();
    elem.triggerEventHandler('click', null);
    expect(component.error).toBeTruthy();
  });


  it('should call add method for list and give error for duplicate name', () =>{
    let elem = fixture.debugElement.query(By.css('.add_btn'));
    component.name = "todo";
    component.type = "List";
    spyOn(component, 'add').and.callThrough();
    elem.triggerEventHandler('click', null);
    //expect(component.add).toHaveBeenCalled();
    expect(component.error).toBeTruthy();
  });

  it('should call add method and throw error name Required', ()=> {
    let elem = fixture.debugElement.query(By.css('.add_btn'));
    component.name = "";
    spyOn(component, 'add').and.callThrough();
    elem.triggerEventHandler('click', null);
    expect(component.error).toBeTruthy();
  });

});
