import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseImageComponent } from './firebase-image.component';

describe('FirebaseImageComponent', () => {
  let component: FirebaseImageComponent;
  let fixture: ComponentFixture<FirebaseImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirebaseImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirebaseImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
