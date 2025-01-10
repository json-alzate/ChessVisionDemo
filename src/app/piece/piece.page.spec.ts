import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PiecePage } from './piece.page';

describe('PiecePage', () => {
  let component: PiecePage;
  let fixture: ComponentFixture<PiecePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
