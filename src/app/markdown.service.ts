import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { marked } from 'marked';
import axios from 'axios';
import {GitHubContent, GitHubContents, parse} from "./content/git-hub-content";

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  constructor() { }

  async getMarkdown(subPath: string): Promise<string> {
    try {
      const url = await this.getContent(subPath)
      if (url.length == 0)
        console.error('No markdown catch');
      if (url[0].type != 'file')
        console.error('Not a file');
      const response = await axios.get(url[0].download_url);
      return marked.parse(response.data);
    } catch (error) {
      console.error('Error fetching markdown file:', error);
      throw error;
    }
  }

  async getContent(subPath : string = ''): Promise<GitHubContents> {
    try {
      const response = await axios.get(environment.apiContent + subPath
        , {
        headers: {}
      });
      // return response.data.map((file: any) => file.name.replace('.md', ''));
      const parsedContent: GitHubContents = response.data.map((item: any) => {
        return parse(item);
      }).filter(Boolean) as GitHubContents
      parsedContent.forEach((item: GitHubContent) => {
        console.log(item.name);
      });
      return parsedContent
    } catch (error) {
      console.error('Error fetching markdown files:', error);
      return [];
    }
  }
}
