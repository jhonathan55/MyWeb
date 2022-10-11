import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //declaramos variables para validar form
  private isValidEmail = /\S+@\S+\.\S+/;
  private lengthPassword = 6;
  private lengthCell = 9;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  registerForm = this.fb.group({
    //Validators.pattern metodo de FormBuelder qlue valida con una expresion regular previamente creado
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    //minLength valida la cantidad min de caracteres
    password: ['', [Validators.required]],
    // politicas: ['', [Validators.requiredTrue]]
  });

  ngOnInit(): void {
  }
  async onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      if (this.registerForm.valid) {
        console.log(email, password);
        const user = await this.authSvc.register(email, password);
        if (user) {
          this.authSvc.registerR(email, password).subscribe(res => {
            console.log(res);
          })
          alert('User created successfully');
          this.router.navigate(['/Home']);
        } else {
          alert('Error al crear el usuario');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
 

  //metodo valida campos vacios y muestra el error en txtbox con la propiedad de boostrap is-valid
  isValidField(field: string): string {
    const validatedField = this.registerForm.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }






}
