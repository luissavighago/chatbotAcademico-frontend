import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptMessageItemComponent } from './prompt-message-item.component';

describe('PromptMessageItemComponent', () => {
  let component: PromptMessageItemComponent;
  let fixture: ComponentFixture<PromptMessageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptMessageItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptMessageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
