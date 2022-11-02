import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { IonicModule } from '@ionic/angular';
import { AllProductsPage, ProductPage } from './pages';
import { ProductItemComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIInputComponent } from 'src/app/shared/ui';

@NgModule({
  declarations: [AllProductsPage, ProductPage, ProductItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ProductsRoutingModule,
    UIInputComponent,
  ],
})
export class ProductsModule {}
