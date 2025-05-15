import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import { MarkdownService } from '../markdown.service';
import {DefaultFolderPath, FolderPath, toStringFolderPath} from "../content/folder-path";
import {getDownloadUrl} from "../content/git-hub-content";

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.css', '../default/simple-css.min.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MarkdownViewerComponent implements OnInit {
  markdownContent: string = '';
  folderPath: FolderPath = DefaultFolderPath;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private markdownService: MarkdownService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.folderPath = this.markdownService.decodePath(decodeURIComponent(params.get('markdown') || ''));
    });

    this.markdownService.getMarkdown(toStringFolderPath(this.folderPath)).then(
      async content => this.markdownContent = await this.processImageSrc(content)
    ).catch((error : Error) => {
      console.error(error.message)
      this.error = true
    });

  }

  async processImageSrc(div: string): Promise<string> {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = div;

    const imgElements = tempDiv.querySelectorAll('img');

    // @ts-ignore
    for (const img of imgElements) {
      const currentSrc = img.getAttribute('src');
      if (currentSrc) {
        const newSrc = await this.modifyImageSource(currentSrc);
        img.setAttribute('src', newSrc);
      }
    }

    return tempDiv.innerHTML
  }

  private async modifyImageSource(originalSrc: string): Promise<string> {
    const url = this.folderPath.path + '/' + originalSrc
    const gitHubContent = await this.markdownService.getContent(url)
    return getDownloadUrl(await gitHubContent)
  }
}
