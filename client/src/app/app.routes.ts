import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { OrderComponent } from './pages/order/order.component';


export const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'add_product',
    component: AddProductComponent,
  },
  {
    path:"admin",component: AdminComponent
  },
  {
    path: 'product_list',
    component: ProductListComponent,
  },
  {
    path:"orders",
    component: OrderComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
