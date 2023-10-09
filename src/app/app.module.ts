import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthTokenInterceptor } from './security/interceptors/auth-token.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './security/utils/jwt-util.service';
import { PasswordRecoverComponent } from './modules/password-recover/password-recover.component';

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
        NgbModule,
        HttpClientModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
