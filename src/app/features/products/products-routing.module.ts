import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProductsPage, ProductPage } from './pages';

const routes: Routes = [
  {
    path: '',
    component: AllProductsPage,
  },
  {
    path: ':id',
    component: ProductPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
