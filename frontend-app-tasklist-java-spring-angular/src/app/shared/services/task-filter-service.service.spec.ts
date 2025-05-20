import { TestBed } from '@angular/core/testing';

import { TaskFilterServiceService } from './task-filter-service.service';

describe('TaskFilterServiceService', () => {
  let service: TaskFilterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskFilterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
