export const SYNONYMS_MD : string[] = [
  '.md',
  '.MD',
  '.Md',
  '.mD'
]

export function includeSynonymMd(s : string) : boolean {
  return SYNONYMS_MD.some(synonym => s.includes(synonym))
}
