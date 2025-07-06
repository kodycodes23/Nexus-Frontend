import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  Calendar,
  Bell,
  AlertCircle,
  Clock,
  Users,
  Activity,
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  avatar?: string;
  status: "normal" | "attention" | "critical";
  lastContact: string;
  concerns: string[];
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
  };
}

interface Appointment {
  id: string;
  patientName: string;
  patientAvatar?: string;
  date: string;
  time: string;
  type: string;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    status: "critical",
    lastContact: "10 min ago",
    concerns: ["Chest pain", "Shortness of breath"],
    vitals: {
      heartRate: 110,
      bloodPressure: "150/95",
      temperature: 38.2,
    },
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    status: "attention",
    lastContact: "1 hour ago",
    concerns: ["Persistent cough"],
    vitals: {
      heartRate: 85,
      bloodPressure: "130/85",
      temperature: 37.8,
    },
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    status: "normal",
    lastContact: "3 hours ago",
    concerns: ["Medication review"],
    vitals: {
      heartRate: 72,
      bloodPressure: "120/80",
      temperature: 36.9,
    },
  },
  {
    id: "4",
    name: "David Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    status: "normal",
    lastContact: "1 day ago",
    concerns: ["Follow-up appointment"],
    vitals: {
      heartRate: 68,
      bloodPressure: "118/75",
      temperature: 36.6,
    },
  },
  {
    id: "5",
    name: "Lisa Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    status: "attention",
    lastContact: "2 hours ago",
    concerns: ["Elevated blood pressure", "Headaches"],
    vitals: {
      heartRate: 88,
      bloodPressure: "145/90",
      temperature: 37.1,
    },
  },
];

const mockAppointments: Appointment[] = [
  {
    id: "a1",
    patientName: "Sarah Johnson",
    patientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    date: "Today",
    time: "11:30 AM",
    type: "Urgent Care",
  },
  {
    id: "a2",
    patientName: "Michael Chen",
    patientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    date: "Today",
    time: "2:15 PM",
    type: "Follow-up",
  },
  {
    id: "a3",
    patientName: "Emily Rodriguez",
    patientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    date: "Tomorrow",
    time: "9:00 AM",
    type: "Consultation",
  },
];

const healthTrendData = [
  { name: "Mon", heartRate: 75, bloodPressure: 120, temperature: 36.8 },
  { name: "Tue", heartRate: 78, bloodPressure: 122, temperature: 36.7 },
  { name: "Wed", heartRate: 82, bloodPressure: 128, temperature: 36.9 },
  { name: "Thu", heartRate: 79, bloodPressure: 125, temperature: 37.0 },
  { name: "Fri", heartRate: 76, bloodPressure: 119, temperature: 36.8 },
  { name: "Sat", heartRate: 72, bloodPressure: 118, temperature: 36.7 },
  { name: "Sun", heartRate: 74, bloodPressure: 120, temperature: 36.8 },
];

const commonConcerns = [
  { concern: "Medication questions", count: 32 },
  { concern: "Headaches", count: 28 },
  { concern: "Sleep issues", count: 24 },
  { concern: "Anxiety symptoms", count: 21 },
  { concern: "Blood pressure", count: 18 },
];

const DashboardView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    navigate("/doctor/patientdetail");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500";
      case "attention":
        return "bg-amber-500";
      case "normal":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=doctor" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Patients Requiring Attention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockPatients.filter((p) => p.status !== "normal").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  From {mockPatients.length} total patients
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockAppointments.filter((a) => a.date === "Today").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Next: {mockAppointments[0].time} -{" "}
                  {mockAppointments[0].patientName}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  New Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  5 urgent messages
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Patient Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Contact</TableHead>
                        <TableHead>Concerns</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.map((patient) => (
                        <TableRow
                          key={patient.id}
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => handlePatientClick(patient)}
                        >
                          <TableCell className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={patient.avatar} />
                              <AvatarFallback>
                                {patient.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{patient.name}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-3 h-3 rounded-full ${getStatusColor(patient.status)}`}
                              ></div>
                              <span className="capitalize">
                                {patient.status}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{patient.lastContact}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {patient.concerns.map((concern, i) => (
                                <Badge key={i} variant="outline">
                                  {concern}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center space-x-4 p-2 rounded-md hover:bg-muted"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={appointment.patientAvatar} />
                        <AvatarFallback>
                          {appointment.patientName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{appointment.patientName}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>
                            {appointment.date} at {appointment.time}
                          </span>
                        </div>
                      </div>
                      <Badge>{appointment.type}</Badge>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    View All Appointments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Patient List</CardTitle>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>Blood Pressure</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Concerns</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow
                      key={patient.id}
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => handlePatientClick(patient)}
                    >
                      <TableCell className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={patient.avatar} />
                          <AvatarFallback>
                            {patient.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{patient.name}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${getStatusColor(patient.status)}`}
                          ></div>
                          <span className="capitalize">{patient.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{patient.lastContact}</TableCell>
                      <TableCell>{patient.vitals.heartRate} bpm</TableCell>
                      <TableCell>{patient.vitals.bloodPressure}</TableCell>
                      <TableCell>{patient.vitals.temperature}°C</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {patient.concerns.map((concern, i) => (
                            <Badge key={i} variant="outline">
                              {concern}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedPatient && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedPatient.avatar} />
                      <AvatarFallback>
                        {selectedPatient.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedPatient.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Last contact: {selectedPatient.lastContact}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                    <Button size="sm">View Full Profile</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Vital Signs</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-primary" />
                          <span>Heart Rate</span>
                        </div>
                        <span className="font-medium">
                          {selectedPatient.vitals.heartRate} bpm
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-primary" />
                          <span>Blood Pressure</span>
                        </div>
                        <span className="font-medium">
                          {selectedPatient.vitals.bloodPressure}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-primary" />
                          <span>Temperature</span>
                        </div>
                        <span className="font-medium">
                          {selectedPatient.vitals.temperature}°C
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Health Concerns</h3>
                    <div className="space-y-2">
                      {selectedPatient.concerns.map((concern, i) => (
                        <div
                          key={i}
                          className="flex items-center p-2 bg-muted rounded-md"
                        >
                          <AlertCircle className="h-4 w-4 mr-2 text-primary" />
                          <span>{concern}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Recent Activity</h3>
                    <div className="space-y-2">
                      <div className="flex items-center p-2 bg-muted rounded-md">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>Chatbot conversation - 10 min ago</span>
                      </div>
                      <div className="flex items-center p-2 bg-muted rounded-md">
                        <Activity className="h-4 w-4 mr-2 text-primary" />
                        <span>Shared heart rate data - 1 hour ago</span>
                      </div>
                      <div className="flex items-center p-2 bg-muted rounded-md">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        <span>Scheduled appointment - 2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    New Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={appointment.patientAvatar} />
                            <AvatarFallback>
                              {appointment.patientName.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{appointment.patientName}</span>
                        </TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-muted rounded-md">
                  <Calendar className="h-12 w-12 mx-auto text-primary" />
                  <p className="mt-2">Calendar integration placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Population Health Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={healthTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="heartRate"
                        stroke="#f43f5e"
                        fill="#f43f5e"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="bloodPressure"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="temperature"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Patient Concerns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonConcerns.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium">{item.concern}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">
                          {item.count}
                        </span>
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: `${(item.count / commonConcerns[0].count) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patient Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-md">
                  <Users className="h-12 w-12 text-primary mb-2" />
                  <h3 className="text-2xl font-bold">42</h3>
                  <p className="text-sm text-muted-foreground">Average Age</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-md">
                  <div className="flex space-x-2 mb-2">
                    <div
                      className="w-4 h-12 bg-blue-500 rounded-sm self-end"
                      style={{ height: "30px" }}
                    ></div>
                    <div
                      className="w-4 h-12 bg-pink-500 rounded-sm self-end"
                      style={{ height: "42px" }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Gender Distribution
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-md">
                  <div className="flex space-x-1 mb-2">
                    <div
                      className="w-3 h-12 bg-green-500 rounded-sm self-end"
                      style={{ height: "25px" }}
                    ></div>
                    <div
                      className="w-3 h-12 bg-yellow-500 rounded-sm self-end"
                      style={{ height: "35px" }}
                    ></div>
                    <div
                      className="w-3 h-12 bg-red-500 rounded-sm self-end"
                      style={{ height: "20px" }}
                    ></div>
                    <div
                      className="w-3 h-12 bg-purple-500 rounded-sm self-end"
                      style={{ height: "40px" }}
                    ></div>
                    <div
                      className="w-3 h-12 bg-blue-500 rounded-sm self-end"
                      style={{ height: "30px" }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Age Groups</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardView;
