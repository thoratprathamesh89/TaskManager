import { TestBed, ComponentFixture, fakeAsync} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AppComponent } from '../app.component'; 
import { StyleManagerService } from '../services/style-manager.service';

import { ThemeService } from './theme.service';

export const mockTheme: any = [
    {
      "backgroundColor": "#fff",
      "buttonColor": "#ffc107",
      "headingColor": "#673ab7",
      "label": "Deep Purple & Amber",
      "value": "deeppurple-amber"
    },
    {
      "backgroundColor": "#fff",
      "buttonColor": "#ff4081",
      "headingColor": "#3f51b5",
      "label": "Indigo & Pink",
      "value": "indigo-pink"
    },
    {
      "backgroundColor": "#303030",
      "buttonColor": "#607d8b",
      "headingColor": "#e91e63",
      "label": "Pink & Blue Grey",
      "value": "pink-bluegrey"
    },
    {
      "backgroundColor": "#303030",
      "buttonColor": "#4caf50",
      "headingColor": "#9c27b0",
      "label": "Purple & Green",
      "value": "purple-green"
    }
  ];

describe('ThemeService', () => {
  let service: ThemeService;
  let httpTestingController: HttpTestingController;
  let fixture : ComponentFixture<AppComponent>;
  let styleManagerService : StyleManagerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThemeService, StyleManagerService],
      declarations: [AppComponent]
    }).overrideComponent(AppComponent, {
      remove: {
        templateUrl: './app.component.html'
      },
      add: {
        template: '<div id="themeAsset"></div>'
    }}).compileComponents();
    
    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.get(ThemeService);
    httpTestingController = TestBed.get(HttpTestingController);
    styleManagerService = TestBed.get(StyleManagerService);
    spyOn(styleManagerService,'setStyle').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Service should return theme", async ()=> {
     service.getThemeOptions().subscribe( theme => {
      expect(theme).not.toBe(null);
      expect(theme).toEqual(mockTheme);
      const req = httpTestingController.expectOne(`assets/theme.json`);
      req.flush(mockTheme);
    });   
  });

  it('should set style', fakeAsync(() => {
    service.setTheme("deeppurple-amber.css");
    expect(styleManagerService.setStyle).toHaveBeenCalled();
  }));


});
