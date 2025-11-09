import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPresentComponent } from './group-present.component';

describe('GroupPresent', () => {
  let component: GroupPresentComponent;
  let fixture: ComponentFixture<GroupPresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupPresentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
