import { Component, OnInit } from '@angular/core';
import { MarkdownService } from '../markdown.service';

@Component({
  selector: 'app-markdown-list',
  templateUrl: './markdown-list.component.html',
  styleUrls: ['./markdown-list.component.css']
})
export class MarkdownListComponent implements OnInit {
  markdownFiles: string[] = [];

  constructor(private markdownService: MarkdownService) { }

  ngOnInit(): void {
    //
    this.markdownService.getContent().then(

      //files => this.markdownFiles = files
    );
  }
}
