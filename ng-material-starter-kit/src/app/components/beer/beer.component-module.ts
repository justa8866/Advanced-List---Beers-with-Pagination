import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerComponent } from './beer.component';
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from "@angular/material/list";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatListModule,
  ],
  declarations: [BeerComponent],
  providers: [],
  exports: [BeerComponent]
})
export class BeerComponentModule {
}
