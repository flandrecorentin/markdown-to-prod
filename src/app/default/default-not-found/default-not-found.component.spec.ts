import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultNotFoundComponent } from './default-not-found.component';

describe('DefaultNotFoundComponent', () => {
  let component: DefaultNotFoundComponent;
  let fixture: ComponentFixture<DefaultNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultNotFoundComponent]
    });
    fixture = TestBed.createComponent(DefaultNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
