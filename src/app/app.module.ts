import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './samples/counter/counter.component';
import { EditFormComponent } from './samples/edit-form/edit-form.component';
import { SummaryComponent } from './samples/summary/summary.component';

@NgModule({
  declarations: [AppComponent, CounterComponent, EditFormComponent, SummaryComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
