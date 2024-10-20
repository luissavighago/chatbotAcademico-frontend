import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgDialogComponent } from './msg-dialog.component';

describe('MsgDialogComponent', () => {
  let component: MsgDialogComponent;
  let fixture: ComponentFixture<MsgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
