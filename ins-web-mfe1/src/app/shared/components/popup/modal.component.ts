
import {ChangeDetectionStrategy, Component, Output, EventEmitter,inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'modal-popup',
    templateUrl: 'modal.component.html',
    styleUrls:['modal.component.scss'],
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
    ],
  })
  export class ModalComponent {
    readonly dialogRef = inject(MatDialogRef<ModalComponent>);
    readonly data= inject<any>(MAT_DIALOG_DATA);;
    readonly animal = model(this.data);
    @Output() saveData = new EventEmitter<string>();
    onCancelClick(): void {
      this.dialogRef.close();
    }

    onSaveClick() {
        this.saveData.emit(this.data);
      }
  }