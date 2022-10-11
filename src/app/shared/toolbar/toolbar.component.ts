import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';
import { UserI, UserResponseI } from '../interfaces/auth';

import { AuthService } from 'src/app/pages/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})


export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  //user: Observable<UserResponseI> ;
  user!: Observable<UserResponseI> | unknown;
  //user:UserResponseI[]=[];
  userEmail!: string;
   //static readonly username: string | undefined;
  constructor(

    private matDialog: MatDialog,
    private authSvc: AuthService,
    private router: Router

  ) {

  }

  ngOnInit(): void {
   

  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
  onSearch(user: any) {
    console.log("search", user);

  }
  

}
