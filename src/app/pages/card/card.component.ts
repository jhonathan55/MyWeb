import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  private isValidEmail = /\S+@\S+\.\S+/;

  constructor(
    private fb: FormBuilder
  ) { }

  contacFrm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    celular: ['', [Validators.required]],
    message: ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  //validación de form
  isValidField(field: string): string {
    const validatedField = this.contacFrm.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }
}
