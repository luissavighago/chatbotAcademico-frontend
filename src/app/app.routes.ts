import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PromptTechniquesComponent } from './components/prompt-techniques/prompt-techniques.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'prompts', component: PromptTechniquesComponent}
];
