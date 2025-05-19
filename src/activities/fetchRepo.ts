import fs from 'fs-extra';
import path from 'path';

export async function fetchRepoFiles(repoPath: string): Promise<{ path: string, content: string }[]> {
  const files: { path: string, content: string }[] = [];

  const scan = async (dir: string) => {
    const entries = await fs.readdir(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        await scan(fullPath);
      } else if (entry.endsWith('.ts') || entry.endsWith('.js')) {
        const content = await fs.readFile(fullPath, 'utf-8');
        files.push({ path: path.relative(repoPath, fullPath), content });
      }
    }
  };

  await scan(repoPath);
  return files;
}
