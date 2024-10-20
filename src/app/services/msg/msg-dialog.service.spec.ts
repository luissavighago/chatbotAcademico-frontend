import { TestBed } from '@angular/core/testing';

import { MsgDialogService } from './msg-dialog.service';

describe('MsgDialogService', () => {
  let service: MsgDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
