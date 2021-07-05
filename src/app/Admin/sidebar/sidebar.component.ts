import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    collapse?: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
    
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'nc-icon nc-bank'
},
{
    path: '/category',
    title: 'Add',
    type: 'link',
    icontype: 'nc-icon nc-simple-add'
},

// Only hidden items Don't Delete this Path

// {
//     path: '/vendors',
//     title: 'Vendors',
//     type: 'link',
//     icontype: 'fa fa-industry'
// },
{
    path: '/emi',
    title: 'EMI ',
    type: 'link',
    icontype: 'fa fa-percent'
},
{
    path: '/inventory',
    title: 'Manage Inventory',
    type: 'link',
    icontype: 'fa fa-product-hunt'
},
{
    path: '/customers',
    title: 'Customers',
    type: 'sub',
    collapse: 'customers',
    icontype: 'nc-icon nc-single-02',
    children: [
        { path: 'customerlist', title: 'Customer List', ab: 'CL' },

    ]
},
{
    path: '/orders',
    title: 'Orders List',
    type: 'sub',
    collapse: 'orders',
    icontype: 'fa fa-shopping-cart',
    children: [
        { path: 'current', title: 'Recent Orders', ab: 'CO' },
        { path: 'pending', title: 'Pending Orders', ab: 'PO' },
        { path: 'running', title: 'Shipments Orders', ab: 'SO' },
        { path: 'complete', title: 'Complete Orders', ab: 'CO' },
    ]
},
{
    path: '/reviews',
    title: 'Customer Reviews ',
    type: 'link',
    icontype: 'fa fa-star'
},
{
    path: '/banners',
    title: 'Banners Change',
    type: 'sub',
    collapse: 'banners',
    icontype: 'fa fa-picture-o',
    children: [
        { path: 'webhome', title: 'Web Home', ab: 'WH' },
        { path: 'mobilehome', title: 'Mobile Home', ab: 'MH' },
        
    ]
},
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    public menuItems: any[];
    public adminName = localStorage.getItem('AdminName');
    constructor(
        private router: Router,
      ) {
       }
    isNotMobileMenu() {
        if (window.outerWidth > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    ngAfterViewInit() {
    }
    adminLogout(){
        localStorage.removeItem('authenticationAdminToken');
        this.router.navigate(['/pages/login'])
    }
}

