import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AuthTokenInterceptor } from './security/interceptors/auth-token.interceptor';
import { ErrorHandlerInterceptor } from './security/interceptors/error-handler.interceptor';
import { SpinnerInterceptor } from './security/interceptors/spinner.interceptor';
import { tokenGetter } from './security/utils/jwt-util.service';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { GenericComponent } from './shared/generic/generic.component';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SpinnerModule } from './shared/spinner/spinner.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter
            }
        }),
        NgxPermissionsModule.forRoot(),
        NgbModule,
        HttpClientModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule,
        SpinnerModule
    ],
    declarations: [
        AppComponent,
        GenericComponent,
        
        
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
