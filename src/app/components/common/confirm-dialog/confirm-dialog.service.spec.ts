import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';

import { ConfirmDialogService } from './confirm-dialog.service';
import { MatDialogModule, MatDialog} from '@angular/material/dialog';
import { of } from 'rxjs';

export class TestComponent  {};
describe('ConfirmDialogService', () => {
  let service: ConfirmDialogService;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [ConfirmDialogService, MatDialog]
    }).compileComponents();
    service = TestBed.get(ConfirmDialogService);
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('open modal ', () => {
    service.open(TestComponent);
    expect(dialogSpy).toHaveBeenCalled();

    // You can also do things with this like:
    expect(dialogSpy).toHaveBeenCalled();
    service.confirmed();
    // and ...
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
});

});
