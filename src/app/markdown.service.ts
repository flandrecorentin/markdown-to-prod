import { Injectable } from '@angular/core';
import { marked } from 'marked';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  constructor() { }

  async getMarkdownContent(url: string): Promise<string> {
    try {
      const response = await axios.get(url);
      return marked.parse(response.data);
    } catch (error) {
      console.error('Error fetching markdown file:', error);
      throw error;
    }
  }

  async getMarkdownFiles(): Promise<string[]> {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/flandrecorentin/learning/refs/heads/main/'
//         , {
//         headers: {
//           Accept: 'application/vnd.github.v3+json'
//         }
      });
      return response.data.map((file: any) => file.name.replace('.md', ''));
    } catch (error) {
      console.error('Error fetching markdown files:', error);
      return [];
    }
  }
}
