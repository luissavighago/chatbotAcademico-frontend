import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptMessageListComponent } from './prompt-message-list.component';

describe('PromptMessageListComponent', () => {
  let component: PromptMessageListComponent;
  let fixture: ComponentFixture<PromptMessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptMessageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
