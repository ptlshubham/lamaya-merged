import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhomeComponent } from './webhome.component';

describe('WebhomeComponent', () => {
  let component: WebhomeComponent;
  let fixture: ComponentFixture<WebhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
