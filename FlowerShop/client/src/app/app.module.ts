import { environment } from 'src/environments/environment.prod';
import { ChartModule } from 'angular-highcharts';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';
import { ScrollService } from './services/scroll.service';
import {
  APP_INITIALIZER,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './conponents/home/home.component';
import { HeaderComponent } from './conponents/shared/header/header.component';
import { FooterComponent } from './conponents/shared/footer/footer.component';
import { NewsComponent } from './conponents/news/news.component';
import { NavigationComponent } from './conponents/shared/navigation/navigation.component';
import { PaginationListComponent } from './conponents/news/pagination-list/pagination-list.component';
import { AboutUsComponent } from './conponents/about-us/about-us.component';
import { ArticleComponent } from './conponents/article/article.component';
import { ContactsComponent } from './conponents/contacts/contacts.component';
import { ContactUsComponent } from './conponents/contacts/contact-us/contact-us.component';
import { PhoneDirective } from './directives/phone.directive';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './conponents/registration/registration.component';
import { PopupComponent } from './conponents/shared/popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './keycloak.init';
import { ProfileComponent } from './conponents/profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { CatalogComponent } from './conponents/catalog/catalog.component';
import { CategoriesComponent } from './conponents/catalog/categories/categories.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatSelectModule } from '@angular/material/select';
import { FiltersMobileDialogComponent } from './conponents/catalog/filters-mobile-dialog/filters-mobile-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CrossButtonComponent } from './conponents/shared/cross-button/cross-button.component';
import { SortsMobileDialogComponent } from './conponents/catalog/sorts-mobile-dialog/sorts-mobile-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { PricePipe } from './pipes/price.pipe';
import { ProductDetailsComponent } from './conponents/product-details/product-details.component';
import { CardsComponent } from './conponents/shared/cards/cards.component';
import { ButtonComponent } from './conponents/shared/button/button.component';
import { WorkExamplesComponent } from './conponents/shared/work-examples/work-examples.component';
import { SearchDialogComponent } from './conponents/shared/header/search-dialog/search-dialog.component';
import { ProductsContentComponent } from './conponents/catalog/products-content/products-content.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingIndicatorComponent } from './conponents/shared/loading-indicator/loading-indicator.component';
import { SearchComponent } from './conponents/search/search.component';
import { CartAndOrderComponent } from './conponents/cart-and-order/cart-and-order.component';
import { CheckboxComponent } from './conponents/shared/checkbox/checkbox.component';
import { FlowerCardComponent } from './conponents/shared/flower-card/flower-card.component';
import { TextInputComponent } from './conponents/shared/text-input/text-input.component';
import { RadioButtonComponent } from './conponents/shared/radio-button/radio-button.component';
import { CookieService } from 'ngx-cookie-service';
import { PriceHistoryDialogComponent } from './conponents/price-history-dialog/price-history-dialog.component';
import { GoogleMapComponent } from './conponents/shared/google-map/google-map.component';
import { AgmCoreModule } from '@agm/core';
import { ChatComponent } from './conponents/chat/chat.component';
import { SafePipe } from './pipes/safe.pipe';
import { PaymentDialogComponent } from './conponents/payment-dialog/payment-dialog.component';
import { OrdersComponent } from './conponents/orders/orders.component';
import { OrderComponent } from './conponents/shared/order/order.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    NavigationComponent,
    PaginationListComponent,
    AboutUsComponent,
    ArticleComponent,
    ContactsComponent,
    ContactUsComponent,
    PhoneDirective,
    RegistrationComponent,
    PopupComponent,
    ProfileComponent,
    CatalogComponent,
    CategoriesComponent,
    FiltersMobileDialogComponent,
    CrossButtonComponent,
    SortsMobileDialogComponent,
    PricePipe,
    ProductDetailsComponent,
    CardsComponent,
    ButtonComponent,
    WorkExamplesComponent,
    SearchDialogComponent,
    ProductsContentComponent,
    LoadingIndicatorComponent,
    SearchComponent,
    CartAndOrderComponent,
    CheckboxComponent,
    FlowerCardComponent,
    TextInputComponent,
    RadioButtonComponent,
    PriceHistoryDialogComponent,
    GoogleMapComponent,
    ChatComponent,
    SafePipe,
    PaymentDialogComponent,
    OrdersComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    KeycloakAngularModule,
    MatMenuModule,
    NgxSliderModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    ChartModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApi.key,
      libraries: ['places', 'geometry'],
    }),
    MatExpansionModule,
  ],
  exports: [PhoneDirective],
  providers: [
    ScrollService,
    FormBuilder,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService],
    // },
    CartService,
    CookieService,
    UserService,
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
