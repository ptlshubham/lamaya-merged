import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './Admin/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './Admin/layouts/auth/auth-layout.component';
import { AuthGuard } from './auth.guard';

export const AppRoutes: Routes = [
    {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
},
{
    path: '',
    component: AdminLayoutComponent,
    children: [{
        path: '',
        loadChildren: './Admin/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
    }, {
        path: 'components',
        loadChildren: './Admin/components/components.module#ComponentsModule',
        canActivate: [AuthGuard]
    }, {
        path: 'forms',
        loadChildren: './Admin/forms/forms.module#Forms',
        canActivate: [AuthGuard]
    }, {
        path: 'tables',
        loadChildren: './Admin/tables/tables.module#TablesModule',
        canActivate: [AuthGuard]
    }, {
        path: 'maps',
        loadChildren: './Admin/maps/maps.module#MapsModule',
        canActivate: [AuthGuard]
    }, {
        path: 'charts',
        loadChildren: './Admin/charts/charts.module#ChartsModule',
        canActivate: [AuthGuard]
    }, {
        path: 'calendar',
        loadChildren: './Admin/calendar/calendar.module#CalendarModule',
        canActivate: [AuthGuard]
    }, {
        path: '',
        loadChildren: './Admin/userpage/user.module#UserModule',
        canActivate: [AuthGuard]
    }, {
        path: '',
        loadChildren: './Admin/timeline/timeline.module#TimelineModule',
        canActivate: [AuthGuard]
    }, {
        path: '',
        loadChildren: './Admin/widgets/widgets.module#WidgetsModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './Admin/category/category.module#CategoryModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './Admin/emi/emi.module#EmiModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'orders',
        loadChildren: './Admin/orders/orders.module#OrdersModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'customers',
        loadChildren: './Admin/customers/customers.module#CustomersModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './Admin/reviews/reviews.module#ReviewsModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './Admin/inventory/inventory.module#InventoryModule',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: './Admin/vendors/vendors.module#VendorsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'banners',
        loadChildren: './Admin/banners/banners.module#BannersModule',
        canActivate: [AuthGuard]
    },

    // {
    //     path: 'home ',
    //     loadChildren: './User/home/home.module#HomeModule'
    // },
    // {
    //     path: 'product',
    //     loadChildren: './User/product/product.module#ProductModule'
    // },
    // {
    //     path: '',
    //     loadChildren: './User/aboutus/aboutus.module#AboutusModule'
    // },
    // {
    //     path: '',
    //     loadChildren: './User/contactus/contactus.module#ContactusModule'
    // },
    // {
    //     path: '',
    //     loadChildren: './User/checkout/checkout.module#CheckoutModule'
    // },
    // {
    //     path: '',
    //     loadChildren: './User/mobileview/mobileview.module#MobileviewModule'
    // },
    // {
    //     path: 'user',
    //     loadChildren: './User/registeruser/registeruser.module#RegisteruserModule'
    // }
    ]
},
{
    path: '',
    component: AuthLayoutComponent,
    children: [{
        path: 'pages',
        loadChildren: './Admin/pages/pages.module#PagesModule'
    }]
},

];
