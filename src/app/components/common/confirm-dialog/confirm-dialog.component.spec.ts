import {async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

xdescribe('ConfirmDailogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialog: MatDialog;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [BrowserDynamicTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'myTitle',
          }
        }
      ],
      declarations: [ ConfirmDialogComponent ]
    });
    
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ConfirmDialogComponent]
      }
    });
    TestBed.compileComponents();
   
  }));

  beforeEach(inject([MatDialog],
    (d: MatDialog) => {
      dialog = d;
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onCancel should close the dialog', () => {
    component.cancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

});
