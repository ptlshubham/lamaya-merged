import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SidebarModule } from './Admin/sidebar/sidebar.module';
import { FixedPluginModule } from './Admin/shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './Admin/shared/footer/footer.module';
import { NavbarModule } from './Admin/shared/navbar/navbar.module';
import { AdminLayoutComponent } from './Admin/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './Admin/layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth/auth-http-interceptor';
import { ColorPickerModule } from 'ngx-color-picker';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { HomeModule } from './User/home/home.module';
// import { ProductModule } from './User/product/product.module';
// import { FooterUserModule } from './User/shared/footer/footer.module';
// import { NavbaruserModule } from './User/shared/navbaruser/navbaruser.module';
// import { ContactusModule } from './User/contactus/contactus.module';
// import { AboutusModule } from './User/aboutus/aboutus.module';
// import { IvyCarouselModule } from 'angular-responsive-carousel';
// import { RegisteruserModule } from './User/registeruser/registeruser.module';
// import { AuthInterceptor } from './auth/auth-http-interceptor';
// import { AuthService } from './User/services/auth.service';
 //import { AuthGuard } from './auth.guard';
// import { NgxStarRatingModule } from 'ngx-star-rating';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgImageSliderModule } from 'ng-image-slider';
// import { GalleryModule } from 'ng-gallery';
// import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';
// import { LightboxModule } from 'ng-gallery/lightbox';
// import { MatSnackBarModule } from '@angular/material/snack-bar';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: false
    }),
    NgbModule,
    HttpModule,
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    ColorPickerModule,
    // HomeModule,
    // ProductModule,
    // FooterUserModule,
    // NavbaruserModule,
    // ContactusModule,
    // AboutusModule,
    // IvyCarouselModule,
    // NgxStarRatingModule,
    // BrowserModule,
    // RegisteruserModule,
    // NgImageSliderModule,
    // // IvyCarouselModule,
    // NgMultiSelectDropDownModule.forRoot(),
    // // JwtModule.forRoot({
    // //     config: {
    // //       tokenGetter: tokenGetter,
    // //       blacklistedRoutes: ['localhost:4000/api/auth']
    // //     }
    // //   })
    // GalleryModule,
    // LightboxModule,
    // ImageViewerModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,

  ],
  providers: [
    // AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [
    // MatSnackBarModule,
  ]

})
export class AppModule { }
