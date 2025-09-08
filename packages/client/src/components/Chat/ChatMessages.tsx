import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export type Message = {
  role: "user" | "assistant";
  content: string;
};
interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const handleCopy = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selectedText);
    }
  };
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg, index) => (
        <div
          ref={index === messages.length - 1 ? lastMessageRef : null}
          onCopy={handleCopy}
          className={`px-3 py-1 max-w-md rounded-xl ${msg.role === "user" ? "bg-blue-600 text-white self-end" : "bg-gray-100 text-black self-center"}`}
          key={index}
        >
          <ReactMarkdown>{msg.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
