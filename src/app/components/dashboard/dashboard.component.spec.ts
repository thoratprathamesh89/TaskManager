import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import{ FormsModule } from '@angular/forms';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

import { DashboardComponent } from './dashboard.component';
import { TasklistComponent } from '../common/tasklist/tasklist.component';
import { DashboardService } from './dashboard.service';
import { Observable, of } from 'rxjs';

const data = of([{"name":"todo", "list": []}]);

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockdashboardService;

  beforeEach(async(() => {
    mockdashboardService = jasmine.createSpyObj(['getTaskList','saveTaskList']);
    mockdashboardService.getTaskList.and.callFake(()=> {return data});
    mockdashboardService.saveTaskList.and.callFake(() => { return data});
    TestBed.configureTestingModule({
      imports: [ FormsModule, MatMenuModule, MatIconModule ],
      declarations: [ DashboardComponent ],
      providers : [{provide: DashboardService, useValue: mockdashboardService}]
    }).overrideComponent( DashboardComponent, {
      remove: {
        templateUrl: './dashboard.component.html'
      },
      add: {
        template: '<div class="menu-icon" (click)="themeChangeHandler"></div>'
    }})
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('on Init', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(mockdashboardService.saveTaskList).toHaveBeenCalled();
  }));

});
