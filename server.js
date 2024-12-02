// 导入依赖
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

// 创建 Express 应用
const app = express();
app.use(cors());
app.use(express.json()); // 解析 JSON 格式的请求体

// 配置 OpenAI API
const configuration = new Configuration({
  organization: 'org-q37tH8Yytu7SRzYnR0eCKUax
proj_eX9ihCjIxth8a6HjsWdwVEsc', // 替换为你的组织 ID
  apiKey: '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', // 替换为你的 API 密钥
});

const openai = new OpenAIApi(configuration);

// 定义聊天接口
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // 调用 OpenAI API
    const response = await openai.createChatCompletion({
      model: 'gpt-4o-mini', // 使用 GPT 模型
      messages: [{ role: 'user', content: message }],
    });

    // 返回 ChatGPT 的回复
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('与 OpenAI 通信时发生错误');
  }
});

// 启动服务器
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`服务器已启动，访问地址：http://localhost:${PORT}`);
});
