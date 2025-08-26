import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Sparkles, TrendingUp, AlertTriangle, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIChat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your AI investment assistant. I can help you analyze your portfolio, track performance, and provide personalized recommendations. Try asking me something like 'How is my portfolio performing?' or 'What should I invest in next?'",
      timestamp: new Date(),
      suggestions: [
        "How is my portfolio performing?",
        "Which platform has the best returns?",
        "Should I diversify more?",
        "What's my risk level?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    let response = "";
    let suggestions: string[] = [];

    if (lowercaseMessage.includes("portfolio") || lowercaseMessage.includes("performance")) {
      response = "Based on your current portfolio of ₹1,25,000 across 4 platforms, you're performing well with an 8.5% monthly growth rate. Your stocks are your top performer at +18%, while crypto shows some volatility. Overall, you're beating the market average of 6%.";
      suggestions = [
        "How can I reduce risk?",
        "Should I increase my investment?",
        "What's my asset allocation?",
        "Compare with market benchmarks"
      ];
    } else if (lowercaseMessage.includes("diversif") || lowercaseMessage.includes("risk")) {
      response = "Your portfolio shows good diversification across asset classes. However, I notice 36% is in stocks and 28% in crypto - this might be slightly high-risk. Consider allocating more to bonds or REITs for stability. Your current risk score is 7/10.";
      suggestions = [
        "Show me safer investment options",
        "What's the ideal allocation?",
        "How to rebalance my portfolio?",
        "Emergency fund recommendations"
      ];
    } else if (lowercaseMessage.includes("invest") && lowercaseMessage.includes("next")) {
      response = "Based on your investment pattern and current market conditions, I recommend: 1) Adding more to your bond allocation (currently only 20%) 2) Consider a small position in international funds 3) Your tech stock exposure could be increased given the recent trends. Would you like specific fund recommendations?";
      suggestions = [
        "Show specific fund recommendations",
        "What about international markets?",
        "Tax-saving investment options",
        "Best platforms for bonds"
      ];
    } else if (lowercaseMessage.includes("platform") || lowercaseMessage.includes("best")) {
      response = "Among your platforms, Zerodha (stocks) has given the best returns at +18% growth. Coinbase (crypto) is more volatile but shows potential. For bonds, consider adding more allocation. Your REITs are performing steadily at +8%. Each platform serves different purposes in your diversified strategy.";
      suggestions = [
        "Compare platform fees",
        "Should I switch platforms?",
        "New platform recommendations",
        "Platform security analysis"
      ];
    } else {
      response = "I understand you're looking for investment insights. I can help you with portfolio analysis, performance tracking, risk assessment, and investment recommendations. What specific aspect of your investments would you like to explore?";
      suggestions = [
        "Analyze my portfolio performance",
        "Risk assessment of my investments",
        "Diversification recommendations",
        "Market trends and opportunities"
      ];
    }

    return {
      id: Date.now().toString(),
      type: "ai",
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = async (messageContent?: string) => {
    const message = messageContent || inputValue.trim();
    if (!message) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Investment Assistant</h2>
          <p className="text-muted-foreground">Get personalized insights and recommendations</p>
        </div>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-success font-medium">Portfolio Health</p>
                <p className="text-2xl font-bold text-success">Excellent</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-accent font-medium">Risk Level</p>
                <p className="text-2xl font-bold text-accent">Moderate</p>
              </div>
              <Target className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-destructive font-medium">Alerts</p>
                <p className="text-2xl font-bold text-destructive">2 Active</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-accent/20 h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="text-foreground">Chat with AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === "ai" && (
                        <Bot className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      )}
                      {message.type === "user" && (
                        <User className="h-5 w-5 text-primary-foreground mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        {message.suggestions && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs text-muted-foreground font-medium">Try asking:</p>
                            <div className="flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-7"
                                  onClick={() => handleSendMessage(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-accent" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="border-t border-accent/20 p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me about your investments..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChat;