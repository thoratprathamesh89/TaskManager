import { TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { ThemeService } from '../../app/services/theme.service';
import { StyleManagerService } from './style-manager.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from '../app.component'; 

describe('StyleManagerService', () => {
  let service: StyleManagerService;
  let themeService: ThemeService;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [ThemeService],
        imports: [HttpClientTestingModule],
        declarations: [AppComponent]
      }).overrideComponent(AppComponent, {
        remove: {
          templateUrl: './app.component.html'
        },
        add: {
          template: '<div id="themeAsset"></div>'
    }}).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    
    service = TestBed.get(StyleManagerService);
    themeService = TestBed.get(ThemeService);
    
    spyOn(service, 'setStyle').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Set Theme Method', fakeAsync(()=> {
    service.setStyle("themeAsset","assets/prebuilt-themes/deeppurple-amber.css");
    expect(service.setStyle).toHaveBeenCalled();
  }));

});