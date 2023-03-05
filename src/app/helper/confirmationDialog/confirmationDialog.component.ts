import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-confirmationDialog',
  templateUrl: './confirmationDialog.component.html',
  styleUrls: ['./confirmationDialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  message: string = "Emin misiniz?"
  confirmButtonText = "Evet"
  cancelButtonText = "Hayır"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }
  ngOnInit(): void {
    
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
