import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MsgDialogType } from '../../enum/msgdialogtype.enum';

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './msg-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MsgDialogComponent {
  MsgDialogType = MsgDialogType;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
