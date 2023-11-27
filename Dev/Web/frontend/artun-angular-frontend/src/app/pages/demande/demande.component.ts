import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/services/demande.service';
import { ActivatedRoute } from '@angular/router';
import { PropositionService } from 'src/app/services/proposition.service'; // Replace with the actual path
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
userId:number=2;
demande:any;
jobForm: FormGroup;
successMessage: string = '';
errorMessage: string = '';

  constructor(
    private route: ActivatedRoute ,private demandeService :DemandeService ,
    private propositionService:PropositionService , private fb: FormBuilder)
    {
      this.jobForm = this.fb.group({
        jobTitle: [''],
        jobDescription: [''],
        hourlyRate: ['']
      });
    }
  ngOnInit(): void {
     const demandId = this.route.snapshot.paramMap.get('id');
      this.getDemandeById(demandId)
  }


  getDemandeById(demandId:any){

    this.demandeService.getDemandById(demandId).subscribe(
      (res) => {
        this.demande = res;
        console.log('Demand details:', res);
      },
      (error) => {
        console.error('Error getting demand details:', error);
      }
    );

  }

  onSubmit() {
    const demandId = this.route.snapshot.paramMap.get('id');
    // Check if the form is valid
    const formData = { ...this.jobForm.value, demandId, userId: this.userId };

    this.propositionService.createProposition(formData).subscribe(
      response => {
        // Handle the response from the server
        console.log('Server response:', response);
        this.successMessage = 'Proposition created successfully!';
        this.errorMessage = ''; // Clear any previous error message
        this.jobForm.reset(); // Optionally, reset the form after successful submission
      },
      error => {
        // Handle errors from the server
        console.error('Error:', error);
        this.successMessage = ''; // Clear any previous success message
        this.errorMessage = 'Error creating proposition. Please try again.'; // Set error message
      }
    );
  }


}
