export type GitHubContents = GitHubContent[];

export interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: 'file' | 'dir' | 'submodule' | 'symlink';
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

export function parse(data : any): GitHubContent {
  return {
    name: data.name,
    path: data.path,
    sha: data.sha,
    size: data.size || 0,
    url: data.url || '',
    html_url: data.html_url || '',
    git_url: data.git_url || '',
    download_url: data.download_url || '',
    type: data.type,
    _links: {
      self: data._links.self || '',
      git: data._links.git || '',
      html: data._links.html || ''
    }
  };
}

export function getDownloadUrl(data : GitHubContent | GitHubContents) {
  if (Array.isArray(data))
    return data[0].download_url
  return data.download_url
}
