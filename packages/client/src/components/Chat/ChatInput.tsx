import { MoveUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

export type ChatFormData = {
  prompt: string;
};

type Props = {
  onSubmit: (data: ChatFormData) => Promise<void>;
};

const ChatInput = ({ onSubmit }: Props) => {
  const { register, handleSubmit, formState, reset } = useForm<ChatFormData>();

  const handleFormSubmit = handleSubmit((data: ChatFormData) => {
    reset({ prompt: "" });
    onSubmit(data);
  });
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleFormSubmit();
      e.preventDefault();
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
    >
      <textarea
        {...register("prompt", {
          required: true,
          minLength: 5,
          maxLength: 1000,
          validate: (value) => value.trim().length > 0,
        })}
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask me anything..."
        maxLength={1000}
        minLength={5}
        autoFocus
      />
      <Button disabled={!formState.isValid} className="rounded-full w-9 h-9 ">
        <MoveUp />
      </Button>
    </form>
  );
};

export default ChatInput;
