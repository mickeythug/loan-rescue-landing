
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data för trafik
const trafficData = [
  { time: "00:00", visitors: 12, pageViews: 45 },
  { time: "04:00", visitors: 8, pageViews: 23 },
  { time: "08:00", visitors: 34, pageViews: 128 },
  { time: "12:00", visitors: 67, pageViews: 245 },
  { time: "16:00", visitors: 89, pageViews: 356 },
  { time: "20:00", visitors: 45, pageViews: 178 },
];

export const TrafficChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trafik Idag</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Besökare"
              />
              <Line 
                type="monotone" 
                dataKey="pageViews" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Sidvisningar"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
