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
    const formData = { ...this.jobForm.value, demandId ,userId:this.userId };
    // if (this.jobForm.valid) {
      // Send the form data to the backend
      this.propositionService.createProposition(formData).subscribe(
        response => {
          // Handle the response from the server
          console.log('Server response:', response);
        },
        error => {
          // Handle errors from the server
          console.error('Error:', error);
        }
      );
   // }
  }

}
