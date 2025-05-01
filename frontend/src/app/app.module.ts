import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { appRoutes } from './app.routing';
import { TaskListComponent } from './pages/task-list/task-list.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AuthComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
