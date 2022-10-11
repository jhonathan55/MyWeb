import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
//firestore
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from '@firebase/auth';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserResponseI } from 'src/app/shared/interfaces/auth';
import { environment } from 'src/environments/environment';
//interfaces
import { UserI } from '../interfaces/user-i';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection?: AngularFirestoreCollection<UserI>;
  constructor(
    public afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore,
    private http: HttpClient

  ) { }
     isLogged(): Observable<any> {
    return this.afAuth.authState.pipe(
      map(auth => auth)
    );
  }
  //login user in firebase
  async login(email: any, password: any): Promise<any> {
    try {
      const user = await this.afAuth.signInWithEmailAndPassword(email, password);

      return user;
    } catch (error) {
      console.log('Error login->', error);
    }
  }

  logIn(user: UserI): Observable<any> {
    return this.http.post<any>(environment.api_url + '/user/login', user).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
     // catchError(err => this.handlerError(err))
    );
  }


  //login user in firebase btn google
  async logginGoogle(): Promise<any> {
    try {
      const result = await this.afAuth.signInWithPopup(
        new GoogleAuthProvider())

      if (result) {
        const uid = result.user?.uid;
        this.usersCollection = this.afs.collection<UserI>('users');
        this.usersCollection.doc(uid).valueChanges().subscribe(res => {
          console.log(res);
        })
      }
      return result;
    } catch (error) {
      console.log('Error->', error);
    }
  }
  //register user in mysql
  registerR(username:any, password:any): Observable<UserResponseI | void> {
    const user:UserI = {
      username,
      password
    }
    
    return this.http.post<UserResponseI>(environment.api_url + '/user/regEmail',user).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      // catchError(err => this.handlerError(err))
    );
  }
  //register user in firebase
  async register(email: any, password: any): Promise<any> {
    try {

      const user = await this.afAuth.createUserWithEmailAndPassword(email, password);

      if (user) {
        const uid = user.user?.uid;
        const username = user.user?.email;

      }
      return user;

    } catch (error) {
      console.log('Error->', error);
      // this.handlerError(error);
    }
  }

  // //captura los errores desde el servidor
  // private handlerError(err: any): Observable<never> {
  //   //let errorMessage = 'An error ocurred retrienving data';
  //   if (err.status == 410) {
  //     Swal.fire(
  //       'Error!',
  //       'User ya existe!',
  //       'error'
  //     )
  //   } if (err.status == 400) {
  //     Swal.fire(
  //       'Error!',
  //       'Usuario ya existe!',
  //       'error'
  //     )
  //   } if (err.status == 200) {
  //     Swal.fire(
  //       'succefull!',
  //       'success'
  //     ).then((result) => {
  //       if (result) {
  //         location.reload();
  //       }
  //     }, (err) => {
  //       Swal.fire('Error', 'No se puedo Eliminar contacto!!', 'error');
  //     })

  //     return throwError(err)
  //   } if (err.status == 404) {
  //     Swal.fire(
  //       'Error!',
  //       'no encontrado',
  //       'error'
  //     )
  //   }
  //   if (err.status == 452) {
  //     Swal.fire(
  //       'Error!',
  //       'Datos incorreectos',
  //       'error'
  //     )
  //   }

  //   //window.alert(errorMessage);
  //   return throwError(err)
  // }
}
