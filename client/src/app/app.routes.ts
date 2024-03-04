import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { OrderComponent } from './pages/order/order.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { HomeComponent } from './pages/User/home/home.component';
import { CheckoutComponent } from './pages/User/checkout/checkout.component';
import { UserProfileComponent } from './pages/User/user-profile/user-profile.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';


export const routes: Routes = [


  {
    path: '', component: HomeComponent
  },
    {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuardService]
  },
  {
    path: 'user_profile', component: UserProfileComponent,canActivate: [AuthGuardService]
  },
  {
    path: 'add_product/edit',
    component: AddProductComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'add_product',
    component: AddProductComponent, canActivate: [AuthGuardService]
  },
  {
    path: "admin_userList", component: AdminComponent, canActivate:[AuthGuardService]
  },
  {
    path: 'product_list',
    component: ProductListComponent, canActivate: [AuthGuardService]
  },
  {
    path: "orders",
    component: OrderComponent, canActivate: [AuthGuardService]
  },
  {
    path: "resetPassword/:id",
    component: ResetPasswordComponent 
  },
  {
    path: "forgotPassword",
    component: ForgotpasswordComponent 
  },
  {
    path:"cart",
    loadComponent:()=>import("./pages/User/cart/cart.component").then(a=>a.CartComponent)
  },
  {
    path: "checkout",
    component: CheckoutComponent, canActivate: [AuthGuardService]
  },
  {
    path: "**",
    component: PagenotfoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
