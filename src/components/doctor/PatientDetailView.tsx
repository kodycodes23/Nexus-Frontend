import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  Clock,
  MessageSquare,
  Phone,
  Plus,
  User,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "patient" | "ai";
  timestamp: string;
  flagged?: boolean;
}

interface VitalData {
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  status: "normal" | "warning" | "critical";
}

interface Appointment {
  id: string;
  date: Date;
  time: string;
  type: string;
  status: "scheduled" | "completed" | "cancelled";
}

interface PatientDetailViewProps {
  patientId?: string;
}

const PatientDetailView: React.FC<PatientDetailViewProps> = ({
  patientId = "12345",
}) => {
  const [activeTab, setActiveTab] = useState("conversation");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);

  // Mock data
  const patient = {
    id: patientId,
    name: "Sarah Johnson",
    age: 42,
    gender: "Female",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    lastActive: "2 hours ago",
    status: "Active",
  };

  const messages: Message[] = [
    {
      id: "1",
      content: "Hello, I've been experiencing headaches for the past week.",
      sender: "patient",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      content:
        "I'm sorry to hear that. Can you describe the pain? Is it constant or does it come and go?",
      sender: "ai",
      timestamp: "10:31 AM",
    },
    {
      id: "3",
      content:
        "It comes and goes, usually worse in the morning. It's a throbbing pain on the right side of my head.",
      sender: "patient",
      timestamp: "10:33 AM",
    },
    {
      id: "4",
      content:
        "I've also been feeling more tired than usual and sometimes feel dizzy when I stand up quickly.",
      sender: "patient",
      timestamp: "10:34 AM",
      flagged: true,
    },
    {
      id: "5",
      content:
        "Thank you for sharing that information. The combination of headaches, fatigue, and dizziness could be related to several conditions. I notice your blood pressure readings have been elevated recently. Have you been taking your prescribed medication regularly?",
      sender: "ai",
      timestamp: "10:36 AM",
    },
    {
      id: "6",
      content:
        "I might have missed a few doses last week when I was traveling.",
      sender: "patient",
      timestamp: "10:38 AM",
      flagged: true,
    },
  ];

  const vitals: VitalData[] = [
    {
      type: "Heart Rate",
      value: 78,
      unit: "bpm",
      timestamp: "Today, 8:30 AM",
      status: "normal",
    },
    {
      type: "Blood Pressure",
      value: 142,
      unit: "90 mmHg",
      timestamp: "Today, 8:30 AM",
      status: "warning",
    },
    {
      type: "Temperature",
      value: 98.6,
      unit: "°F",
      timestamp: "Today, 8:30 AM",
      status: "normal",
    },
    {
      type: "Oxygen Saturation",
      value: 97,
      unit: "%",
      timestamp: "Today, 8:30 AM",
      status: "normal",
    },
    {
      type: "Blood Glucose",
      value: 110,
      unit: "mg/dL",
      timestamp: "Yesterday, 9:15 PM",
      status: "normal",
    },
    {
      type: "Weight",
      value: 165,
      unit: "lbs",
      timestamp: "3 days ago",
      status: "normal",
    },
  ];

  const appointments: Appointment[] = [
    {
      id: "apt1",
      date: new Date(2023, 5, 15),
      time: "10:00 AM",
      type: "Check-up",
      status: "completed",
    },
    {
      id: "apt2",
      date: new Date(2023, 6, 22),
      time: "2:30 PM",
      type: "Follow-up",
      status: "completed",
    },
    {
      id: "apt3",
      date: new Date(),
      time: "11:15 AM",
      type: "Consultation",
      status: "scheduled",
    },
    {
      id: "apt4",
      date: new Date(2023, 7, 10),
      time: "9:45 AM",
      type: "Test Results",
      status: "scheduled",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full h-full overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Patient header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={patient.profileImage} alt={patient.name} />
              <AvatarFallback>
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{patient.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User size={14} /> {patient.age}, {patient.gender}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={14} /> {patient.phone}
                </span>
                <Badge variant="outline" className="ml-2">
                  Last active: {patient.lastActive}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Phone className="mr-2 h-4 w-4" /> Call Patient
            </Button>
            <Button size="sm">
              <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
          </div>
        </div>

        {/* Main content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="conversation">Conversation History</TabsTrigger>
            <TabsTrigger value="vitals">Vitals & Health Data</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden mt-4">
            <TabsContent value="conversation" className="h-full">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Conversation History</CardTitle>
                  <CardDescription>
                    Review patient's conversation with the AI assistant
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "patient" ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${message.sender === "patient" ? "bg-gray-100" : "bg-blue-100"} ${message.flagged ? "border-l-4 border-red-500" : ""}`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">
                                {message.sender === "patient"
                                  ? patient.name
                                  : "AI Assistant"}
                              </span>
                              <span className="text-xs text-gray-500">
                                {message.timestamp}
                              </span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                            {message.flagged && (
                              <div className="mt-2 flex items-center text-xs text-red-600">
                                <AlertCircle size={12} className="mr-1" />
                                <span>Flagged for attention</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="w-full">
                    <h4 className="text-sm font-medium mb-2">
                      AI-Detected Concerns:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-red-50">
                        Medication Adherence
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-50">
                        Elevated Blood Pressure
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-50">
                        Recurring Headaches
                      </Badge>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="vitals" className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Vitals & Health Data</CardTitle>
                  <CardDescription>
                    Patient's health metrics from connected devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vitals.map((vital, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{vital.type}</h3>
                          <Badge className={getStatusColor(vital.status)}>
                            {vital.status}
                          </Badge>
                        </div>
                        <div className="flex items-end gap-1">
                          <span className="text-2xl font-bold">
                            {vital.value}
                          </span>
                          <span className="text-sm text-gray-500">
                            {vital.unit}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {vital.timestamp}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="font-medium mb-4">Blood Pressure History</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">
                        Blood pressure chart visualization would appear here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="h-full">
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Appointments</CardTitle>
                    <CardDescription>
                      Manage patient appointments
                    </CardDescription>
                  </div>
                  <Dialog
                    open={appointmentDialogOpen}
                    onOpenChange={setAppointmentDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Schedule Appointment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Schedule New Appointment</DialogTitle>
                        <DialogDescription>
                          Create a new appointment for {patient.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <label
                            htmlFor="appointment-type"
                            className="text-sm font-medium"
                          >
                            Appointment Type
                          </label>
                          <Select>
                            <SelectTrigger id="appointment-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="checkup">Check-up</SelectItem>
                              <SelectItem value="followup">
                                Follow-up
                              </SelectItem>
                              <SelectItem value="consultation">
                                Consultation
                              </SelectItem>
                              <SelectItem value="test-results">
                                Test Results
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Date</label>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label
                            htmlFor="appointment-time"
                            className="text-sm font-medium"
                          >
                            Time
                          </label>
                          <Select>
                            <SelectTrigger id="appointment-time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9:00">9:00 AM</SelectItem>
                              <SelectItem value="9:30">9:30 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="10:30">10:30 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <label
                            htmlFor="notes"
                            className="text-sm font-medium"
                          >
                            Notes
                          </label>
                          <Textarea
                            id="notes"
                            placeholder="Add any relevant notes"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setAppointmentDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setAppointmentDialogOpen(false)}>
                          Schedule
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="font-medium">Upcoming Appointments</h3>
                    <div className="space-y-3">
                      {appointments
                        .filter((apt) => apt.status === "scheduled")
                        .map((appointment) => (
                          <div
                            key={appointment.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 p-2 rounded-full">
                                <CalendarIcon className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  {appointment.type}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <CalendarIcon size={14} />
                                  <span>
                                    {appointment.date.toLocaleDateString()}
                                  </span>
                                  <Clock size={14} className="ml-2" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                            </div>
                            <Badge
                              className={getStatusColor(appointment.status)}
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                        ))}
                    </div>

                    <Separator className="my-4" />

                    <h3 className="font-medium">Past Appointments</h3>
                    <div className="space-y-3">
                      {appointments
                        .filter((apt) => apt.status === "completed")
                        .map((appointment) => (
                          <div
                            key={appointment.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-gray-100 p-2 rounded-full">
                                <CalendarIcon className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  {appointment.type}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <CalendarIcon size={14} />
                                  <span>
                                    {appointment.date.toLocaleDateString()}
                                  </span>
                                  <Clock size={14} className="ml-2" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                            </div>
                            <Badge
                              className={getStatusColor(appointment.status)}
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDetailView;
