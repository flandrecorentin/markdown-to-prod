import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { MarkdownListComponent } from './markdown-list/markdown-list.component';

const routes: Routes = [
  { path: 'markdown/:markdownFile', component: MarkdownViewerComponent },
  { path: '', component: MarkdownListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
