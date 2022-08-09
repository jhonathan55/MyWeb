import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  private isValidEmail = /\S+@\S+\.\S+/;
  public colSize = 3;
  public rowHeight = '2:3';
  public isMobile: boolean = false;
  public isTable: boolean = false;
  constructor(
    private fb: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {

    breakpointObserver.observe([
      Breakpoints.Handset,
    ]).subscribe(result => {
      if (result.matches) {
        console.log(result.matches);
        
        this.isMobile = true;
        this.colSize = 1;
        this.rowHeight = '550px';
      } else {
        this.isMobile = false;
        this.colSize = 3;
        this.rowHeight = '2:3';
      }

      /* if (this.isMobile) {
         this.colSize=1;
         this.rowHeight='550px';
       }else if(this.isTable){
         this.colSize=3;
         this.rowHeight='700px';
       } 
       else {
         this.colSize=3;
         this.rowHeight = '2:3';
       }*/
    }
    );
  }

  contacFrm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    phone: ['', [Validators.required]],
   

  });

  ngOnInit(): void {
  }

  //validación de form
  isValidField(field: string): string {
    const validatedField = this.contacFrm.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }

  sendMessage(): void {
    console.log(this.contacFrm.value);
  }
}
