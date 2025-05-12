import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from '../markdown.service';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.css']
})
export class MarkdownViewerComponent implements OnInit {
  markdownContent: string = '';
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private markdownService: MarkdownService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const markdownFile = params.get('markdownFile');
      if (markdownFile) {
        const githubUrl = `https://raw.githubusercontent.com/test/${markdownFile}.md`;
        this.markdownService.getMarkdownContent(githubUrl).then(
          content => this.markdownContent = content
        ).catch(() => this.error = true);
      }
    });
  }
}
