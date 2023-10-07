import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTaskComponent } from './modules/calendar/add-task/add-task.component';
import { StatsDialogComponent } from './modules/calendar/stats-dialog/stats-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './modules/register/register.component';
import { DayDetailsComponent } from './modules/calendar/day-details/day-details.component';
import { TaskDetailsComponent } from './modules/calendar/task-details/task-details.component';
import { EditEventComponent } from './modules/calendar/edit-event/edit-event.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent,
    AddTaskComponent,
    StatsDialogComponent,
    RegisterComponent,
    DayDetailsComponent,
    TaskDetailsComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
