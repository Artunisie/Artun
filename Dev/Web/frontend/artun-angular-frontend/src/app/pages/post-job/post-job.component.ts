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
    console.log(this.form.value);

    const clientId = 1;
    // if (this.form.valid) {
      const formData = { ...this.form.value, clientId };

      // Call the service method to submit the form data
      this.demandeService.createDemand(formData).subscribe(response => {
        console.log('Response:', response);

      }, error => {
        console.error('Error:', error);
        // Handle error
      });
    // }
  }


  get requirements() {
		return this.form.get('requirements') as FormArray;
	}


}
