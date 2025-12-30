import { useState } from "react";
import { Send, MessageCircle, User, Bot, Sparkles, X, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      message: "Hello! I'm your CyberShield AI assistant. How can I help you today?",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { type: "user", message: input, time: "Just now" },
    ]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          message:
            "Thanks for your message! Our team will get back to you shortly. In the meantime, you can explore our documentation or schedule a demo.",
          time: "Just now",
        },
      ]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform group"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 z-40 w-80 md:w-96 rounded-2xl bg-card border border-border shadow-xl shadow-background/50 overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-primary to-accent flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-white">CyberShield AI</h4>
            <p className="text-xs text-white/80 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Online now
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-72 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-2 ${
              msg.type === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.type === "user"
                  ? "bg-primary/20"
                  : "bg-gradient-to-r from-primary to-accent"
              }`}
            >
              {msg.type === "user" ? (
                <User className="w-4 h-4 text-primary" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs opacity-60 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 flex-wrap">
          {["Schedule Demo", "Pricing", "Features"].map((action) => (
            <button
              key={action}
              onClick={() => setInput(action)}
              className="px-3 py-1 rounded-full bg-muted text-xs font-medium hover:bg-primary/20 hover:text-primary transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border text-sm focus:border-primary focus:outline-none transition-colors"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          Powered by CyberShield AI
        </p>
      </div>
    </div>
  );
};

export default ChatWidget;