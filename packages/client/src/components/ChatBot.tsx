import { MoveUp } from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

type FormData = {
  prompt: string;
};
const ChatBot = () => {
  const { register, handleSubmit, formState, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(onSubmit)();
      e.preventDefault();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
      />
      <Button disabled={!formState.isValid} className="rounded-full w-9 h-9 ">
        <MoveUp />
      </Button>
    </form>
  );
};

export default ChatBot;
