import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const deepSeek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
});

export async function analyzeModule(filePath: string, code: string): Promise<string> {
  const prompt = `请分析这段代码的作用、模块职责和与其他模块的关系，输出 Markdown 格式内容(不要包含markdown代码块标记)：

文件路径：${filePath}

代码内容：
\`\`\`
${code.slice(0, 8000)}  // 截断处理
\`\`\`
`;

  const res = await deepSeek.chat.completions.create({
    model: 'deepseek-coder',
    messages: [
      { role: 'system', content: '你是开源代码结构分析专家，返回纯Markdown内容，不要包含```markdown和```的包装' },
      { role: 'user', content: prompt }
    ],
  });

  let content = res.choices[0].message.content ?? '（无内容）';
  
  // 移除可能的markdown包装
  content = content.replace(/^\s*```markdown\s*\n?/g, '');
  content = content.replace(/\n?\s*```\s*$/g, '');
  
  return content;
}
