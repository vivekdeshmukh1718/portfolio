
"use client";

import { siteAssistant, type SiteAssistantInput, type SiteAssistantOutput } from "@/ai/flows/site-assistant";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";


interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiInput: SiteAssistantInput = { query: input };
      const aiOutput: SiteAssistantOutput = await siteAssistant(aiInput);
      
      const aiMessage: Message = { id: (Date.now() + 1).toString(), text: aiOutput.answer, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling AI assistant:", error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: "Sorry, I encountered an error. Please try again.", sender: "ai" };
      setMessages((prev) => [...prev, errorMessage]);
      toast({
        title: "AI Assistant Error",
        description: "Could not get a response from the assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 rounded-full shadow-lg w-16 h-16 p-0 z-50 flex items-center justify-center bg-purple-600 text-white hover:bg-purple-700"
            aria-label="Open AI Assistant"
          >
            <Bot className="h-10 w-10" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-lg flex flex-col h-[70vh] max-h-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-red-500" /> AI Site Assistant
            </DialogTitle>
            <DialogDescription>
              Ask me anything about Vivek, his skills, or projects.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-grow p-4 border rounded-md my-2" ref={scrollAreaRef as any}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${
                    msg.sender === "user" ? "justify-end" : ""
                  }`}
                >
                  {msg.sender === "ai" && (
                    <div className="p-2 rounded-full bg-red-500 text-white">
                      <Bot className="h-5 w-5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-purple-500 text-white"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                   {msg.sender === "user" && (
                    <div className="p-2 rounded-full bg-secondary text-secondary-foreground">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
               {isLoading && (
                <div className="flex items-start gap-2">
                   <div className="p-2 rounded-full bg-red-500 text-white">
                      <Bot className="h-5 w-5" />
                    </div>
                  <div className="max-w-[75%] p-3 rounded-lg bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2 text-red-500" />
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                disabled={isLoading}
                aria-label="Your question for the AI assistant"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="bg-purple-600 text-white hover:bg-purple-700">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
