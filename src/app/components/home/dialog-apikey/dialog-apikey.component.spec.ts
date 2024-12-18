import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogApikeyComponent } from './dialog-apikey.component';

describe('DialogApikeyComponent', () => {
  let component: DialogApikeyComponent;
  let fixture: ComponentFixture<DialogApikeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogApikeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogApikeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
