import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { HttpClientModule} from "@angular/common/http";

import { TasklistComponent } from './tasklist.component';
import { of, Observable } from 'rxjs';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { ObserversModule } from '@angular/cdk/observers';


describe('TasklistComponent', () => {
  let dialogService : ConfirmDialogService;
  let component: TasklistComponent;
  let fixture: ComponentFixture<TasklistComponent>;
  let dashboardService : DashboardService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasklistComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule,MatButtonModule, MatIconModule, MatMenuModule, DragDropModule, MatDialogModule, HttpClientModule],
      providers : [ConfirmDialogService, DashboardService]
    })
    .compileComponents();
    dialogService = TestBed.get(ConfirmDialogService);
    dashboardService = TestBed.get(DashboardService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasklistComponent);
    component = fixture.componentInstance;
    component.completeTasksList = [{name:'todo', list: ['test','completed']}]
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(TestBed.get(MatDialog), 'open').and.callFake(()=> { return false });
    spyOn(dialogService, 'confirmed').and.callFake(() => {
      return of(true);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call show Edit Panel Method',() => {
    let ele = fixture.debugElement.query(By.css('.editable_field'));
    spyOn(component, 'showEditPanel').and.callThrough();
    ele.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.showEditPanel).toHaveBeenCalled();
  });

  it('On delete list actual Delete function called', () => {
    spyOn(component,'actualDelete').and.callThrough();
    component.delete('todo', 'list', '');
    fixture.detectChanges();
    expect(component.actualDelete).toHaveBeenCalled();
    expect(component.actualDelete).toHaveBeenCalledWith('todo', 'list', '');
  });

  it('On delete task actual Delete function called', () => {
    spyOn(component,'actualDelete').and.callThrough();
    component.delete('todo', 'card', 'test');
    fixture.detectChanges();
    expect(component.actualDelete).toHaveBeenCalled();
    expect(component.actualDelete).toHaveBeenCalledWith('todo', 'card', 'test');
  });


});
