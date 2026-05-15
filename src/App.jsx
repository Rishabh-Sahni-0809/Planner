import { useState } from "react";
import CompanyPlanner from "./pages/CompanyPlanner.jsx";
import PRDPrompts from "./pages/PRDPrompts.jsx";

const TABS = [
  { id: "planner", label: "📋 Planner", icon: "📋" },
  { id: "prompts", label: "🚀 PRD Prompts", icon: "🚀" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("planner");

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Navigation */}
      <nav className="app-nav">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Page Content */}
      <div className="page-container" key={activeTab}>
        {activeTab === "planner" && <CompanyPlanner />}
        {activeTab === "prompts" && <PRDPrompts />}
      </div>
    </div>
  );
}