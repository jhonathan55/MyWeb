import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { CardComponent } from '../card/card.component';

@NgModule({
  declarations: [
    HomeComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    
    
  ],
  exports: [
    HomeComponent,
    CardComponent
    
  ]
})
export class HomeModule { }
