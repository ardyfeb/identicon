export interface Options {
  border?: number,
  size?: number,
  scale?: number,
  background?: number[],
  format?: 'png' | 'jpeg',
}

export function generate(word: string, options?: Options): Buffer
export function generateToFile(word: string, fileName: string, options?: Options): void