import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SerieDetailsPage } from './serie-details.page';

describe('SerieDetailsPage', () => {
  let component: SerieDetailsPage;
  let fixture: ComponentFixture<SerieDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
