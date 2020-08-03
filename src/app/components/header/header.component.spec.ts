import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatMenuModule } from "@angular/material/menu";
import { HeaderComponent } from './header.component';
import { ThemeService } from '../../services/theme.service';
import { By } from "@angular/platform-browser";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockThemeService;

  beforeEach(async(() => {
    mockThemeService = jasmine.createSpyObj(['setTheme','getThemeOptions']);
    mockThemeService.getThemeOptions.and.callFake(()=> { return ''});
    mockThemeService.setTheme.and.callFake(()=> { return ''});
    
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [MatMenuModule],
      providers: [{provide : ThemeService, useValue: mockThemeService}]
    }).overrideComponent(HeaderComponent , {
      remove: {
        templateUrl: './header.component.html'
      },
      add: {
        template: '<div class="menu-icon" (click)="themeChangeHandler"></div>'
    }}).compileComponents();

    mockThemeService = TestBed.get(ThemeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setting theme initially', () => {
    fixture.detectChanges();
    expect(mockThemeService.setTheme).toHaveBeenCalled();
  });

  xit('calling theme handle function on click', fakeAsync(()=> {
    let elem = fixture.debugElement.query(By.css('.menu-icon'));
    spyOn(component, 'themeChangeHandler');
    elem.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.themeChangeHandler).toHaveBeenCalled();
    //expect(mockThemeService.setTheme).toHaveBeenCalled();
  }));

});
