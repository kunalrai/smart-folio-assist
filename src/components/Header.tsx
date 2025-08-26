import { Button } from "@/components/ui/button";
import { Wallet, MessageSquare, BarChart3, User } from "lucide-react";

const Header = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  return (
    <header className="border-b border-accent/20 bg-card/50 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Wallet className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SmartFolio</h1>
              <p className="text-sm text-muted-foreground">AI Investment Tracker</p>
            </div>
          </div>

          <nav className="flex items-center space-x-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("dashboard")}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>

            <Button
              variant={activeTab === "investments" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("investments")}
              className="flex items-center space-x-2"
            >
              <Wallet className="h-4 w-4" />
              <span>Investments</span>
            </Button>

            <Button
              variant={activeTab === "ai-chat" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("ai-chat")}
              className="flex items-center space-x-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>AI Assistant</span>
            </Button>

            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;