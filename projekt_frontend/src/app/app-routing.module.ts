import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/login/containers';
import { MainPageComponent } from './modules/main-page/containers';
import { GradesPageComponent } from './modules/grades/containers';
import { LessonsPlanComponent } from './modules/lessons-plan/containers';
import { EditNotePageComponent, NotesPageComponent } from './modules/notes/containers';
import { HomeworksPageComponent } from './modules/homeworks/containers';
import { TeachersPageComponent } from './modules/teachers/containers';
import { RegisterPageComponent } from './modules/register/containers';
import { SettingsPageComponent } from './modules/settings/containers';
import { AuthGuard } from './services/auth-guard.service';
import { SubjectsPageComponent } from './modules/subjects/containers';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'dashboard',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    data: { title: 'STRONA GŁÓWNA' },
  },
  {
    path: 'grades',
    component: GradesPageComponent,
    canActivate: [AuthGuard],
    data: { title: 'OCENY' } },
  {
    path: 'lessons-plan',
    component: LessonsPlanComponent,
    canActivate: [AuthGuard],
    data: { title: 'PLAN ZAJĘĆ' },
  },
  {
    path: 'notes',
    component: NotesPageComponent,
    canActivate: [AuthGuard],
    data: { title: 'NOTATKI' }
  },
  {
    path: 'notes/:id',
    component: EditNotePageComponent,
    canActivate: [AuthGuard],
    data: { title: 'EDYTUJ NOTATKĘ' }
  },
  {
    path: 'homeworks',
    component: HomeworksPageComponent,
    canActivate: [AuthGuard],
    data: { title: 'ZADANIA DOMOWE' },
  },
  {
    path: 'teachers',
    component: TeachersPageComponent,
    canActivate: [AuthGuard],
    data: { title: 'NAUCZYCIELE' },
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [AuthGuard],
    data: { title: 'USTAWIENIA' },
  },
  {
    path: 'subjects',
    component: SubjectsPageComponent,
    canActivate: [AuthGuard],
    data: { title: 'PRZEDMIOTY' },
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
