import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../../services/demande.service';
@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent {
  form: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private demandeService: DemandeService) {
    this.form = this.fb.group({
      jobTitle: ['', Validators.required],
      jobDescription: ['', Validators.required],
      hourlyRateMin: ['', Validators.required],
      hourlyRateMax: ['', Validators.required],
      applicationDeadline: ['', Validators.required],
      requirements: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  addRequirement() {
    this.requirements.push(this.fb.control('', Validators.required));
  }

  removeRequirement(index: number) {
    this.requirements.removeAt(index);
  }


  submitForm() {
    const clientId = 1;
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
