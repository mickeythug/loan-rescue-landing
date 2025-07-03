
import { useState, useEffect } from "react";
import { AdminHeader } from "../components/AdminHeader";
import { StatsCards } from "../components/StatsCards";
import { UsersList } from "../components/UsersList";
import { TrafficChart } from "../components/TrafficChart";
import { RealTimeActivity } from "../components/RealTimeActivity";

interface User {
  id: number;
  name: string;
  email: string;
  personnummer: string;
  ipAddress: string;
  status: "online" | "offline";
  lastActivity: Date;
  formCompleted: boolean;
  location: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    name: "Jonas Ali",
    email: "jonas@example.com",
    personnummer: "19901201-1234",
    ipAddress: "192.168.1.100",
    status: "online",
    lastActivity: new Date(),
    formCompleted: true,
    location: "Stockholm",
  },
  {
    id: 2,
    name: "Maria Andersson",
    email: "maria@example.com",
    personnummer: "19851115-5678",
    ipAddress: "192.168.1.101",
    status: "offline",
    lastActivity: new Date(Date.now() - 300000),
    formCompleted: false,
    location: "Göteborg",
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    personnummer: "19920308-9012",
    ipAddress: "192.168.1.102",
    status: "online",
    lastActivity: new Date(),
    formCompleted: true,
    location: "Malmö",
  },
];

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [stats, setStats] = useState({
    totalVisitors: 1247,
    activeUsers: 23,
    formsCompleted: 156,
    conversionRate: 12.5,
  });

  // Simulera realtids uppdateringar
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalVisitors: prev.totalVisitors + Math.floor(Math.random() * 3),
        activeUsers: Math.floor(Math.random() * 50) + 10,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live Updates</span>
          </div>
        </div>

        <StatsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrafficChart />
          <RealTimeActivity />
        </div>

        <UsersList users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
