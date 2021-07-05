import { Routes } from "@angular/router";
import { MobilehomeComponent } from "./mobilehome/mobilehome.component";
import { WebhomeComponent } from "./webhome/webhome.component";


export const BannersRoutes: Routes = [{
    path: '',
    children: [{
        path: 'mobilehome',
        component: MobilehomeComponent
    }]
}, {
    path: '',
    children: [{
        path: 'webhome',
        component: WebhomeComponent
    }]
},

];
