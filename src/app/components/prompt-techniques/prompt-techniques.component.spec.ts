import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptTechniquesComponent } from './prompt-techniques.component';

describe('PromptTechniquesComponent', () => {
  let component: PromptTechniquesComponent;
  let fixture: ComponentFixture<PromptTechniquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptTechniquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptTechniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
