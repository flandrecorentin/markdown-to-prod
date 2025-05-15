import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { MarkdownListComponent } from './markdown-list/markdown-list.component';
import { DefaultNotFoundComponent } from './default/default-not-found/default-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkdownViewerComponent,
    MarkdownListComponent,
    DefaultNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
