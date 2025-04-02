import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeschoolComponent } from './homeschool.component';

describe('HomeschoolComponent', () => {
  let component: HomeschoolComponent;
  let fixture: ComponentFixture<HomeschoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeschoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
