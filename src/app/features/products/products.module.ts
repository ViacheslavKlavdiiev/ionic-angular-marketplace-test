import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { IonicModule } from '@ionic/angular';
import { AllProductsPage, ProductPage } from './pages';
import { ProductItemComponent } from './components';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';

@NgModule({
  declarations: [
    AllProductsPage,
    ProductPage,
    ProductItemComponent,
    FilterPipe,
  ],
  imports: [CommonModule, IonicModule, ProductsRoutingModule],
})
export class ProductsModule {}
