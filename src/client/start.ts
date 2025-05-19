import { Connection, Client } from '@temporalio/client';
import { openInsightWorkflow } from '../workflows/openInsightWorkflow';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
  const connection = await Connection.connect();
  const client = new Client({ connection });

  const repoPath = process.env.REPO_PATH;

  if (!repoPath) {
    throw new Error('REPO_PATH is not set');
  }

  const handle = await client.workflow.start(openInsightWorkflow, {
    args: [repoPath],
    taskQueue: 'openinsight',
    workflowId: 'openinsight-' + Date.now(),
  });

  console.log('🎉 开始...')

  const result = await handle.result();
  console.log('🎉 生成完成，输出路径：', result);
}

run().catch(console.error);
