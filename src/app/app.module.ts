import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './samples/counter/counter.component';
import { RegistrationFormComponent } from './samples/registration-form/registration-form.component';

@NgModule({
  declarations: [AppComponent, CounterComponent, RegistrationFormComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
