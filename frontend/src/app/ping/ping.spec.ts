import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ping } from './ping';

describe('Ping', () => {
  let component: Ping;
  let fixture: ComponentFixture<Ping>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ping]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ping);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
