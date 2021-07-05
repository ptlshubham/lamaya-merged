import { Routes } from "@angular/router";
import { CustomerlistComponent } from "./customerlist/customerlist.component";


export const CustomersRoutes: Routes = [{
    path: '',
    children: [{
        path: 'customerlist',
        component: CustomerlistComponent
    }]
},

//{
//     path: '',
//     children: [{
//         path: 'sweet-alert',
//         component: SweetAlertComponent
//     }]
// },{
//     path: '',
//     children: [{
//         path: 'typography',
//         component: TypographyComponent
//     }]
];
