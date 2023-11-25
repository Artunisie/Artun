import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-option-cli-profess',
  templateUrl: './option-cli-profess.component.html',
  styleUrls: ['./option-cli-profess.component.css']
})
export class OptionCliProfessComponent {
  selectedRadioValue: any;
  constructor(private router: Router,private dialogRef: MatDialogRef<OptionCliProfessComponent>) {}
  onRadioChange(event: any,) {
    this.selectedRadioValue = event.value;
    console.log('Selected Radio Value:', this.selectedRadioValue);
    // Perform any additional actions based on the selected value
  }


  Create_account(){
    if (this.selectedRadioValue === '1') {
      // Navigate to login for clients
      this.router.navigate(['/login_register', { mode: 'register_client' }]);
      this.dialogRef.close(true);
    } else if (this.selectedRadioValue === '2') {
      // Navigate to login for professionals
      this.router.navigate(['/login_register', { mode: 'register_professional' }]);
      this.dialogRef.close(true);
    }
    // Add any additional logic as needed
  }

}
