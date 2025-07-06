import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  Heart,
  Thermometer,
  Clock,
  Droplets,
  ArrowUp,
  ArrowDown,
  AlertCircle,
} from "lucide-react";

interface HealthMetric {
  name: string;
  icon: React.ReactNode;
  value: string | number;
  unit: string;
  status: "normal" | "warning" | "critical" | "disconnected";
  change?: {
    value: number;
    direction: "up" | "down";
  };
}

interface HealthDataPanelProps {
  patientName?: string;
  metrics?: HealthMetric[];
  historicalData?: {
    heartRate: Array<{ time: string; value: number }>;
    temperature: Array<{ time: string; value: number }>;
    bloodPressure: Array<{ time: string; systolic: number; diastolic: number }>;
    bloodOxygen: Array<{ time: string; value: number }>;
  };
  detectedPatterns?: Array<{
    id: string;
    title: string;
    description: string;
    severity: "low" | "medium" | "high";
  }>;
}

const HealthDataPanel = ({
  patientName = "John Doe",
  metrics = [
    {
      name: "Heart Rate",
      icon: <Heart className="h-4 w-4" />,
      value: 72,
      unit: "bpm",
      status: "normal",
      change: { value: 3, direction: "up" },
    },
    {
      name: "Temperature",
      icon: <Thermometer className="h-4 w-4" />,
      value: 98.6,
      unit: "°F",
      status: "normal",
      change: { value: 0.2, direction: "down" },
    },
    {
      name: "Blood Pressure",
      icon: <Activity className="h-4 w-4" />,
      value: "120/80",
      unit: "mmHg",
      status: "normal",
    },
    {
      name: "Blood Oxygen",
      icon: <Droplets className="h-4 w-4" />,
      value: 98,
      unit: "%",
      status: "normal",
      change: { value: 1, direction: "up" },
    },
    {
      name: "Sleep",
      icon: <Clock className="h-4 w-4" />,
      value: 7.5,
      unit: "hrs",
      status: "warning",
      change: { value: 0.5, direction: "down" },
    },
  ],
  historicalData = {
    heartRate: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: 65 + Math.floor(Math.random() * 20),
    })),
    temperature: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: 97.8 + Math.random() * 1.5,
    })),
    bloodPressure: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      systolic: 110 + Math.floor(Math.random() * 20),
      diastolic: 70 + Math.floor(Math.random() * 15),
    })),
    bloodOxygen: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: 95 + Math.floor(Math.random() * 5),
    })),
  },
  detectedPatterns = [
    {
      id: "pattern-1",
      title: "Elevated heart rate during sleep",
      description:
        "Your heart rate was higher than usual during sleep hours for the past 3 nights.",
      severity: "medium",
    },
    {
      id: "pattern-2",
      title: "Irregular sleep pattern",
      description:
        "Your sleep schedule has been inconsistent over the past week.",
      severity: "low",
    },
    {
      id: "pattern-3",
      title: "Blood pressure fluctuations",
      description:
        "Your blood pressure shows significant variations throughout the day.",
      severity: "high",
    },
  ],
}: HealthDataPanelProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      case "disconnected":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="h-full w-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Health Data</h2>
          <Badge variant="outline" className="text-xs">
            {patientName}
          </Badge>
        </div>
      </div>

      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-600 mb-3">
          Connected Devices
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gray-50 border-0 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`p-1.5 rounded-full ${getStatusColor(metric.status)}`}
                    >
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        {metric.name}
                      </p>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold">
                          {metric.value}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          {metric.unit}
                        </span>
                        {metric.change && (
                          <span
                            className={`text-xs ml-2 flex items-center ${metric.change.direction === "up" ? "text-red-500" : "text-green-500"}`}
                          >
                            {metric.change.direction === "up" ? (
                              <ArrowUp className="h-3 w-3 mr-0.5" />
                            ) : (
                              <ArrowDown className="h-3 w-3 mr-0.5" />
                            )}
                            {metric.change.value}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${getStatusColor(metric.status)}`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        <Tabs defaultValue="trends" className="w-full">
          <div className="px-4 pt-2">
            <TabsList className="w-full">
              <TabsTrigger value="trends" className="flex-1">
                Trends
              </TabsTrigger>
              <TabsTrigger value="patterns" className="flex-1">
                Detected Patterns
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="trends" className="p-4 space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Heart Rate (24h)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalData.heartRate}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Temperature (24h)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalData.temperature}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#f97316"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="p-4">
            <div className="space-y-3">
              {detectedPatterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className={`p-3 border rounded-lg ${getSeverityColor(pattern.severity)}`}
                >
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">{pattern.title}</h4>
                      <p className="text-xs mt-1">{pattern.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HealthDataPanel;
