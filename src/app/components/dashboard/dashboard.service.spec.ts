import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';

const dummyListResponse =
  [
    {
      "name":"todo", 
      "list":[
        "Create an Architecture Design Document",
        "Add Card",
        "Add List"
      ]
    }
  ] 


describe('DashboardService', () => {
  let injector: TestBed;
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService]
    });
    injector = getTestBed();
    service = injector.get(DashboardService);
    httpMock = injector.get(HttpTestingController);
    /*service = TestBed.get(DashboardService);
    httpMock = TestBed.get(HttpClientTestingModule);*/
  });
  
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTasklist should return data', ()=>{
    service.getTaskList().subscribe((res) => {
      expect(res).toEqual(dummyListResponse);
    });

    const req = httpMock.expectOne('assets/tasklist.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyListResponse);
  });

  it('saveTaskList should POST and return data', () => {
    service.saveTaskList(dummyListResponse).subscribe((res) => {
      expect(res).toEqual({"status": "success",
      "message": "saved successfully"});
    });
  });

  it('getListObj should return data',()=>{
    service.saveTaskList(dummyListResponse);
    let data = service.getListObject();
    expect(data).toEqual(dummyListResponse);
  });

});
