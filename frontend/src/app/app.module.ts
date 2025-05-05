import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { provideHttpClient } from '@angular/common/http';
import { ToastComponent } from './components/toast/toast.component';
import { SharedModule } from './components/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
  ],
  exports:[
    RouterModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
