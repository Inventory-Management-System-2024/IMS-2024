import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    
    path: 'register',
    component: RegisterComponent,
    
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'add_product',
    component: AddProductComponent,canActivate:[AuthGuardService]
  },
  {
    path:"admin_userList",component: AdminComponent,canActivate:[AuthGuardService]
  },
  {
    path: 'product_list',
    component: ProductListComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
