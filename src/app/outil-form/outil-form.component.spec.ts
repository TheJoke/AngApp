import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilFormComponent } from './outil-form.component';

describe('OutilFormComponent', () => {
  let component: OutilFormComponent;
  let fixture: ComponentFixture<OutilFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutilFormComponent]
    });
    fixture = TestBed.createComponent(OutilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
