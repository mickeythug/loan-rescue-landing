
import { useState } from "react";
import { Send, Shield, Bell, MoreVertical, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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

interface UsersListProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const UsersList = ({ users, setUsers }: UsersListProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSendNotification = (user: User) => {
    toast.success(`Meddelande skickat till ${user.name}`);
  };

  const handleSendBankID = (user: User) => {
    toast.success(`BankID signal skickad till ${user.name}`);
  };

  const handleApproveLogin = (user: User) => {
    toast.success(`Login godkänd för ${user.name}`);
  };

  const formatLastActivity = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just nu";
    if (minutes === 1) return "1 minut sedan";
    if (minutes < 60) return `${minutes} minuter sedan`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return "1 timme sedan";
    return `${hours} timmar sedan`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Aktiva Användare ({users.length})</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-normal text-gray-600">Realtid</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    user.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}></div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    {user.formCompleted && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Formulär Slutfört
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>{user.email}</div>
                    <div>PN: {user.personnummer}</div>
                    <div className="flex items-center space-x-4">
                      <span>IP: {user.ipAddress}</span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {user.location}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatLastActivity(user.lastActivity)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSendNotification(user)}
                  className="flex items-center space-x-1"
                >
                  <Bell className="h-4 w-4" />
                  <span>Meddelande</span>
                </Button>

                <Button
                  size="sm"
                  onClick={() => handleSendBankID(user)}
                  className="flex items-center space-x-1"
                >
                  <Shield className="h-4 w-4" />
                  <span>BankID</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleApproveLogin(user)}>
                      <Shield className="h-4 w-4 mr-2" />
                      Godkänn Inloggning
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Send className="h-4 w-4 mr-2" />
                      Skicka Email
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
