import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPresentDetailComponent } from './group-present-detail.component';

describe('GroupPresentDetail', () => {
  let component: GroupPresentDetailComponent;
  let fixture: ComponentFixture<GroupPresentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupPresentDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupPresentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
