export interface FolderPath {
  path: string;
  markdownFileName: string;
}

export function toStringFolderPath(folderPath : FolderPath) : string {
  return folderPath.path + '/' + folderPath.markdownFileName
}

export const DefaultFolderPath : FolderPath = {path: '', markdownFileName: 'string'};
