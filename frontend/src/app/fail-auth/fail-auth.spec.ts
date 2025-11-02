import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailAuth } from './fail-auth';

describe('FailAuth', () => {
  let component: FailAuth;
  let fixture: ComponentFixture<FailAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailAuth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailAuth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
