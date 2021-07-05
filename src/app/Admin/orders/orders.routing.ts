import { Routes } from "@angular/router";
import { CompleteComponent } from "./complete/complete.component";
import { CurrentComponent } from "./current/current.component";
import { PendingComponent } from "./pending/pending.component";
import { RunningComponent } from "./running/running.component";

export const OrdersRoutes: Routes = [{
    path: '',
    children: [{
        path: 'current',
        component: CurrentComponent
    }]
},{
    path: '',
    children: [{
        path: 'pending',
        component: PendingComponent
    }]
},{
    path: '',
    children: [{
        path: 'complete',
        component: CompleteComponent
    }]
},{
    path: '',
    children: [{
        path: 'running',
        component: RunningComponent
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
