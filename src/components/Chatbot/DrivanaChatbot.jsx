import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Crown, Sparkles, Bot } from "lucide-react";
import API from "../../api/api"; 

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [cars, setCars] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Initial message state
  const [messages, setMessages] = useState([
    { text: "Welcome to Drivana. I'm your AI assistant. Need a recommendation?", sender: "bot" }
  ]);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await API.get("/cars");
        setCars(res.data);
      } catch (err) { console.error("Database error", err); }
    };
    fetchCars();
  }, []);

  // Auto-scroll to the bottom whenever a new message is added
  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    // 1. Add user message to history first
    setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Call backend
      const response = await API.post("/ai/chat", {
        message: userMsg,
        inventory: cars.map(c => `${c.name} at ${c.price}`).join(", "),
        isPremium: isPremium
      });

      // 3. Append bot response to the existing history
      setMessages(prev => [...prev, { text: response.data.reply, sender: "bot" }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "AI engine is offline. I'm currently performing a pit stop.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="text-yellow-400" size={18} />
              <span className="font-bold tracking-tight">Drivana AI</span>
            </div>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>

          {!isPremium && (
            <div onClick={() => setIsPremium(true)} className="bg-yellow-500/10 p-2 text-center cursor-pointer border-b border-yellow-500/20">
              <p className="text-[10px] text-yellow-500 font-bold uppercase flex items-center justify-center gap-1">
                <Crown size={12} /> Unlock Premium Tech Specs
              </p>
            </div>
          )}

          {/* Chat Window */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 rounded-2xl text-sm max-w-[85%] shadow-md ${
                  m.sender === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-slate-800 text-blue-400 text-xs rounded-2xl rounded-tl-none border border-slate-700 animate-pulse flex items-center gap-2">
                  <Bot size={14}/> Drivana is thinking...
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="bg-slate-800 text-white text-xs p-3 rounded-xl flex-1 outline-none focus:ring-1 focus:ring-blue-500" 
              placeholder="Ask: What car fits 10 Lakh budget?" 
            />
            <button onClick={handleSend} className="bg-blue-600 p-3 rounded-xl hover:bg-blue-500 transition shadow-lg active:scale-95">
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 p-4 rounded-full shadow-lg hover:scale-110 transition group relative">
           <div className="absolute -top-2 -right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-slate-950 animate-ping"></div>
          <MessageSquare className="text-white" />
        </button>
      )}
    </div>
  );
}