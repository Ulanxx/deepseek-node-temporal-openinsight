import fs from 'fs-extra';
import path from 'path';

export async function saveMarkdownDoc(repoName: string, doc: string): Promise<string> {
  const fileName = `${repoName.replace(/[\/\\]/g, '-')}-${Date.now()}.md`;
  const filePath = path.join(process.cwd(), 'output', fileName);
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, doc);
  return filePath;
}
