import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { MarkdownListComponent } from './markdown-list/markdown-list.component';
import {DefaultNotFoundComponent} from "./default/default-not-found/default-not-found.component";

const routes: Routes = [
  { path: 'md/:markdown', component: MarkdownViewerComponent },
  { path: '', component: MarkdownListComponent },
  { path: '**', component: DefaultNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
