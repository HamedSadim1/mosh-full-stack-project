import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// conversationId to lastResponseId mapping
// In de pruduction, gebruikt een database zoals Redis of PostgreSQL
const conversations = new Map<string, string>();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the server");
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from the API" });
});

app.post("/api/chat", async (req: Request, res: Response) => {
  const { prompt, conversationId } = req.body;

  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id: conversations.get(conversationId),
    });

    res.json({ message: response.output_text });
    conversations.set(conversationId, response.id);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
