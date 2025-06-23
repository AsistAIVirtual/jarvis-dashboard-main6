import React, { useState } from 'react';
import DailyVolume from './components/DailyVolume';
import GreenLock from './components/GreenLock';
import ReminderForm from './components/ReminderForm';
import AgentMarket from './components/AgentMarket';
import TotalStakedAgents from './components/TotalStakedAgents';
import GenesisTokens from './components/GenesisTokens';

const tabs = [
  { name: 'Daily Volume', component: <DailyVolume /> },
  { name: 'Green Lock Period', component: <GreenLock /> },
  { name: 'Subscribe Unlock Period', component: <ReminderForm /> },
  { name: 'Agent Market', component: <AgentMarket /> },
  { name: 'Total Staked Agents', component: <TotalStakedAgents /> },
  { name: 'Genesis Tokens', component: <GenesisTokens /> },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
              activeTab === index
                ? 'bg-white text-black border-gray-300 shadow'
                : 'bg-black text-white border-white'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div>{activeTab !== null && tabs[activeTab].component}</div>
    </div>
  );
};

export default Dashboard;
