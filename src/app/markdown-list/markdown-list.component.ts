import { Component, OnInit } from '@angular/core';
import { MarkdownService } from '../markdown.service';
import {GitHubContent, GitHubContents} from "../content/git-hub-content";
import {includeSynonymMd} from "../default/synonym-markdown";
import {SYNONYMS} from "../default/acronym-override";

@Component({
  selector: 'app-markdown-list',
  templateUrl: './markdown-list.component.html',
  styleUrls: ['./markdown-list.component.css', '../markdown.css', '../default/simple-css.min.css']
})
export class MarkdownListComponent implements OnInit {
  markdownFilesMapped: Map<string, GitHubContents> = new Map<string, GitHubContents>;

  constructor(protected markdownService: MarkdownService) { }

  async ngOnInit(): Promise<void> {
    console.log("==ngOnInit for markdown list")
    await this.dfs('')
    console.log(this.markdownFilesMapped)
    console.log(this.markdownFilesMapped.get('web'))
    console.log(this.markdownFilesMapped.entries())
  }

  private async dfs(url: string): Promise<void> {
    const root = await this.markdownService.getContent(url)
    if (Array.isArray(root)) {
      root.forEach(item => this.manageGitHubContent(item))
    } else {
      // @ts-ignore
      this.manageGitHubContent(root)
    }
  }

  private manageGitHubContent(gitHubContent : GitHubContent) {
    if (gitHubContent.type == 'dir') {
      this.dfs(gitHubContent.path)
    } else if (gitHubContent.type == 'file' && includeSynonymMd(gitHubContent.name)) {
      const lastFolderIndex = gitHubContent.path.lastIndexOf('/');
      const folderPath = gitHubContent.path.substring(0, lastFolderIndex);

      if (this.markdownFilesMapped.has(folderPath)) {
        // @ts-ignore
        this.markdownFilesMapped.get(folderPath).push(gitHubContent)
      } else {
        const gitHubContents : GitHubContents = []
        gitHubContents.push(gitHubContent)
        this.markdownFilesMapped.set(folderPath, gitHubContents)
      }
    }
  }

  protected getynonymOrDefault(default_ : string) {
    return SYNONYMS.has(default_) ? SYNONYMS.get(default_) : default_
  }
}
