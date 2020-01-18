import { TestBed } from '@angular/core/testing';

import { IdListService } from './id-list.service';

describe('IdListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdListService = TestBed.get(IdListService);
    expect(service).toBeTruthy();
  });
});
