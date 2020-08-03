import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

import { ThemeMenuComponent } from './theme-menu.component';

xdescribe('ThemeMenuComponent', () => {
  let component: ThemeMenuComponent;
  let fixture: ComponentFixture<ThemeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeMenuComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ MatMenuModule ]
    }).overrideComponent(ThemeMenuComponent, {
      remove : {
        templateUrl: './theme-menu.component.html',
      },
      add : {
        template: '<button (click)="changeTheme(\'deeppurple-amber\')"></button>'
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should emit on click calling Theme Change method', ()=> {
    const component = fixture.componentInstance; 
    spyOn(component.themeChange, 'emit');
    spyOn(component, 'changeTheme');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.themeChange.emit).toHaveBeenCalled();
    expect(component.changeTheme).toHaveBeenCalledWith('deeppurple-amber');
  });

});
