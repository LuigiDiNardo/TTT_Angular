import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SusComponent } from './sus.component';

describe('SusComponent', () => {
  let component: SusComponent;
  let fixture: ComponentFixture<SusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
