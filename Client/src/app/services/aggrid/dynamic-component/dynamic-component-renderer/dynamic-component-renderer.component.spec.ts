import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponentRendererComponent } from './dynamic-component-renderer.component';

describe('DynamicComponentRendererComponent', () => {
  let component: DynamicComponentRendererComponent;
  let fixture: ComponentFixture<DynamicComponentRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicComponentRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicComponentRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
