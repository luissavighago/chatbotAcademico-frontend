import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsgDialogComponent } from '../../components/msg-dialog/msg-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MsgDialogService {

  readonly dialog = inject(MatDialog);

  constructor() { }

  openDialog(parms: any) {
    const dialogRef = this.dialog.open(MsgDialogComponent, {data:parms});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 
}
