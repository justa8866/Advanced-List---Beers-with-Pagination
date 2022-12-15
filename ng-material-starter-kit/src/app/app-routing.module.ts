import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BeerComponent } from './components/beer/beer.component';
import { BeerComponentModule } from './components/beer/beer.component-module';
import { BeerServiceModule } from './services/beer.service-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'bears-with-pagination', component: BeerComponent }]), BeerComponentModule, BeerServiceModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
