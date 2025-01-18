import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilModalComponent } from './profil-modal.component';

describe('ProfilModalComponent', () => {
  let component: ProfilModalComponent;
  let fixture: ComponentFixture<ProfilModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilModalComponent]
    });
    fixture = TestBed.createComponent(ProfilModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
