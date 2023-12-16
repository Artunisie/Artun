import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../../services/demande.service';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  form: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  userDetails:any  ;

  constructor(
    private keycloakService: KeycloakService,
    private fb: FormBuilder, private demandeService: DemandeService) {
    this.form = this.fb.group({
      jobTitle: ['', Validators.required],
      jobDescription: ['', Validators.required],
      hourlyRateMin: ['', Validators.required],
      hourlyRateMax: ['', Validators.required],
      applicationDeadline: ['', Validators.required],
      requirements: this.fb.array([this.fb.control('', Validators.required)])
    });
  }
  ngOnInit(): void {
    this.keycloakService.loadUserProfile(true).then((user:any)=>{
      this.userDetails = user ;
      console.log("userDetails",user) ;
    });

  }

  addRequirement() {
    this.requirements.push(this.fb.control('', Validators.required));
  }

  removeRequirement(index: number) {
    this.requirements.removeAt(index);
  }


  submitForm() {
    const clientId = this.userDetails.id;
    console.log("client id" , clientId)
    const formData = { ...this.form.value, clientId };

    this.demandeService.createDemand(formData).subscribe(response => {
      console.log('Response:', response);
      this.successMessage = 'Job created successfully!';
      this.errorMessage = ''; // Clear any previous error message
      this.form.reset();
    }, error => {
      console.error('Error:', error);
      this.successMessage = ''; // Clear any previous success message
      this.errorMessage = 'Error creating job. Please try again.'; // Set error message
    });
  }


  get requirements() {
		return this.form.get('requirements') as FormArray;
	}


}
