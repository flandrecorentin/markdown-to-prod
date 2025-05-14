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
  markdownPath: string = '';
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private markdownService: MarkdownService
  ) { }

  ngOnInit(): void {
    console.log(this.route.outlet)
    console.log(this.route.queryParamMap)
    // console.log(this.route.paramMap.subscribe(paramMap => {console.log(paramMap)}))
    this.route.paramMap.subscribe(urlSegments => {
      console.log("MarkdownViewerComponent")
      const markdownFile = urlSegments.get('path') + '.md'; // TODO : Try with .MD .Md .mD
      console.log("urlSegments: " + urlSegments)
      // this.markdownPath = urlSegments.slice(1).map(segment => segment.path).join('/');
      if (this.markdownPath) {
        console.log(this.markdownPath)
        this.markdownService.getMarkdown(this.markdownPath).then(
          content => this.markdownContent = content
        ).catch(() => this.error = true);
      }
    });
  }
}
