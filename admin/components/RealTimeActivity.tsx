
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, User, FileText, MousePointer } from "lucide-react";

interface Activity {
  id: number;
  type: "visit" | "form" | "click" | "exit";
  user: string;
  action: string;
  timestamp: Date;
}

export const RealTimeActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: "visit",
      user: "Jonas Ali",
      action: "Besökte startsidan",
      timestamp: new Date(),
    },
    {
      id: 2,
      type: "form",
      user: "Maria Andersson",
      action: "Slutförde formulär",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: 3,
      type: "click",
      user: "Ahmed Hassan",
      action: "Klickade på 'Ansök nu'",
      timestamp: new Date(Date.now() - 300000),
    },
  ]);

  // Simulera nya aktiviteter
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now(),
        type: ["visit", "form", "click", "exit"][Math.floor(Math.random() * 4)] as Activity["type"],
        user: ["Jonas Ali", "Maria Andersson", "Ahmed Hassan", "Anna Svensson"][Math.floor(Math.random() * 4)],
        action: [
          "Besökte startsidan",
          "Slutförde formulär",
          "Klickade på 'Ansök nu'",
          "Lämnade sidan",
          "Öppnade om oss",
        ][Math.floor(Math.random() * 5)],
        timestamp: new Date(),
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "visit":
        return <User className="h-4 w-4" />;
      case "form":
        return <FileText className="h-4 w-4" />;
      case "click":
        return <MousePointer className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "visit":
        return "bg-blue-100 text-blue-800";
      case "form":
        return "bg-green-100 text-green-800";
      case "click":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("sv-SE", { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit" 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Realtids Aktivitet</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className={getActivityColor(activity.type)}>
                  {getActivityIcon(activity.type)}
                </Badge>
                <div>
                  <div className="font-medium text-sm">{activity.user}</div>
                  <div className="text-xs text-gray-600">{activity.action}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {formatTime(activity.timestamp)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
