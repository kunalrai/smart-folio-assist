import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import Investments from "@/components/Investments";
import AIChat from "@/components/AIChat";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "investments":
        return <Investments />;
      case "ai-chat":
        return <AIChat />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
