import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { marked } from 'marked';
import axios from 'axios';
import {GitHubContent, GitHubContents, parse} from './content/git-hub-content';
import {FolderPath} from "./content/folder-path";

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  constructor() { }

  async getMarkdown(subPath: string): Promise<string> {
    const gitHubContent = await this.getContent(subPath)

    if (Array.isArray(gitHubContent) || gitHubContent.type != 'file') {
      throw new Error('The content is not a simple file')
    }

    try {
      const response = await axios.get(gitHubContent.download_url);
      return marked.parse(response.data);
    } catch (e) {
      throw Error('Error fetching markdown file:' + e);
    }
  }

  /** Example decode : 'dsa_web_SSR-rendering' -> {path: 'dsa/web' markdownFileName: 'SSR-rendering.md'}
   */
  decodePath(input: string) : FolderPath {
    const decode = input.split('_').join('/') + '.md' // dsa/web/SSR-rendering.md

    const decodeSplit = decode.split('/')
    const markdownFileName = decodeSplit.pop() // SSR-rendering.md
    const path = decodeSplit.join('/') // dsa/web

    return {
      path: path,
      markdownFileName: markdownFileName == undefined ? '' : markdownFileName
    }
  }

  async getContent(subPath : string = ''): Promise<GitHubContents | GitHubContent> {
    try {
      const response= await axios.get(environment.apiContent + subPath,
        {
          headers: {}
        });

      return Array.isArray(response.data) ?
        response.data.map((item: any) => parse(item)).filter(Boolean) as GitHubContents :
        parse(response.data)
    } catch (error) {
      throw new Error('Error fetching content: ' + error);
    }
  }

  async getAllContents(subPath : string = ''): Promise<GitHubContents | null> {
    return null;
  }
}
