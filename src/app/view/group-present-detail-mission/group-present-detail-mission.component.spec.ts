import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPresentDetailMissionComponent } from './group-present-detail-mission.component';

describe('GroupPresentMission', () => {
  let component: GroupPresentDetailMissionComponent;
  let fixture: ComponentFixture<GroupPresentDetailMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupPresentDetailMissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupPresentDetailMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
