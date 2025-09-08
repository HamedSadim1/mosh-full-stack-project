import axios from "axios";
import { useRef, useState } from "react";
import ChatInput, { type ChatFormData } from "./ChatInput";
import type { Message } from "./ChatMessages";
import ChatMessages from "./ChatMessages";
import TypingIndicator from "./TypingIndicator";
import popSound from "@/assets/sounds/pop.mp3";
import notificationSound from "@/assets/sounds/notification.mp3";

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

type ChatResponse = {
  message: string;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  const [error, setError] = useState<string>("");

  const conversationId = useRef(crypto.randomUUID()).current;

  const onSubmit = async ({ prompt }: ChatFormData) => {
    try {
      setMessages((prev) => [...prev, { role: "user", content: prompt }]);
      setIsAssistantTyping(true);
      console.log(prompt);
      setError("");
      popAudio.play();

      const { data } = await axios.post<ChatResponse>("/api/chat", {
        prompt,
        conversationId,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
      notificationAudio.play();
    } catch (error) {
      console.error(error);
      setError("Er is een fout opgetreden. Probeer het later opnieuw.");
    } finally {
      setIsAssistantTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto ">
        <ChatMessages messages={messages} />

        {isAssistantTyping && <TypingIndicator />}
        {error && <div className="text-red-600 ">{error}</div>}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};

export default ChatBot;
