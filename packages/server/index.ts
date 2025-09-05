import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import z from "zod";
import { conversationRepository } from "./repositories/conversation.repository";
import { chatService } from "./services/chat.service";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "Prompt is required")
    .max(1000, "Prompt is too long (max 1000 characters)"),
  conversationId: z
    .string()
    .regex(/^(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})$/),
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the server");
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from the API" });
});

app.post("/api/chat", async (req: Request, res: Response) => {
  const parseResult = chatSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.format });
  }

  try {
    const { prompt, conversationId } = parseResult.data;
    const response = await chatService.sendMessage(prompt, conversationId);

    conversationRepository.setLastResponseId(conversationId, response.id);
    res.json({ message: response.message, responseId: response.id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
