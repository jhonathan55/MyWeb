import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide=true;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  //creamos variables para validar form
  private isValidEmail = /\S+@\S+\.\S+/;
  private lengthPassword = 6;
  ngOnInit(): void {
  }

  //crea metodo loginForm que recibe dos parametros desde el html
  loginForm = this.fb.group({
    //Validators.pattern metodo de FormBuelder qlue valida con una expresion regular previamente creado
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    //minLength valida la cantidad min de caracteres
    password: ['', [Validators.required]]
  });

  async onLogginGoogle() {
    try {
      const user = await this.authSvc.logginGoogle();
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  // async onLoggin() {
  //   const { email, password } = this.loginForm.value;
  //   try {
  //     if (this.loginForm.valid) {
  //       const user = await this.authSvc.login(email, password);
  //       // if (!user) {
  //       //   alert('Usuario o contraseña incorrectos');
         
  //       // }else{
  //       //   const username= user.user?.email;
  //       //   console.log('username',username);
          
  //       //   //this.router.navigate(['/home']);
  //       // }
        
  //     }

  //     // const user = await this.authSvc.onLogin();
  //     // return user;
  //   } catch (error) {
  //     console.log('Error->', error);
  //   }
  // }

  async onRegister() {
    this.router.navigate(['/register']);
  }

  onLogin(){
    console.log('loginForm',this.loginForm.value);
    
  }
  
  //valida los input
  isValidField(field: string): string {
    const validatedField = this.loginForm.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }



}
