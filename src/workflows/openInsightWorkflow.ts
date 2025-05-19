import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities";

const { fetchRepoFiles, analyzeModule, saveMarkdownDoc } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: "1 minute",
});

export async function openInsightWorkflow(repoPath: string): Promise<string> {
  const files = await fetchRepoFiles(repoPath);

  const summaries = [];
  for (const file of files) {
    const summary = await analyzeModule(file.path, file.content);
    summaries.push(`# ${file.path}\n${summary}`);
  }

  const fullDoc = summaries.join("\n\n");
  const outputPath = await saveMarkdownDoc(repoPath, fullDoc);
  return outputPath;
}
