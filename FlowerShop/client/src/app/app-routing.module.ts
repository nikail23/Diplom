import { LogInComponent } from './conponents/log-in/log-in.component';
import { OrdersComponent } from './conponents/orders/orders.component';
import { SearchComponent } from './conponents/search/search.component';
import { SearchDialogComponent } from './conponents/shared/header/search-dialog/search-dialog.component';
import { ProductDetailsComponent } from './conponents/product-details/product-details.component';
import { CatalogComponent } from './conponents/catalog/catalog.component';
import { ProfileComponent } from './conponents/profile/profile.component';
import { RegistrationComponent } from './conponents/registration/registration.component';
import { ContactsComponent } from './conponents/contacts/contacts.component';
import { ArticleComponent } from './conponents/article/article.component';
import { AboutUsComponent } from './conponents/about-us/about-us.component';
import { NewsComponent } from './conponents/news/news.component';
import { HomeComponent } from './conponents/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';
import { CartAndOrderComponent } from './conponents/cart-and-order/cart-and-order.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {path: 'news/:id', component: ArticleComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'catalog', component: CatalogComponent},
  {path: 'catalog/:id', component: ProductDetailsComponent},
  {path: 'search', component: SearchComponent},
  {path: 'cart-and-order', component: CartAndOrderComponent},
  {path: 'orders', component: OrdersComponent},
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
