import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutes } from './pages.routing';
import { RegisterComponent } from './register/register.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        LockComponent
    ],
    exports:[
        RegisterService,
        LoginService
    ]
})

export class PagesModule {}
