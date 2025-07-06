import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, ArrowRight, Stethoscope, User } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState<"patient" | "doctor" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate the user
    if (role === "patient") {
      navigate("/patient/chat");
    } else if (role === "doctor") {
      navigate("/doctor/dashboard");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would register the user
    setActiveTab("login");
  };

  return (
    <div className="min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/10 flex">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Nexus Health
            </CardTitle>
            <CardDescription>
              Personalized health guidance powered by Nexus AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>I am a:</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Button
                        type="button"
                        variant={role === "patient" ? "default" : "outline"}
                        className="flex items-center justify-center gap-2"
                        onClick={() => setRole("patient")}
                      >
                        <User size={18} />
                        Patient
                      </Button>
                      <Button
                        type="button"
                        variant={role === "doctor" ? "default" : "outline"}
                        className="flex items-center justify-center gap-2"
                        onClick={() => setRole("doctor")}
                      >
                        <Stethoscope size={18} />
                        Doctor
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={!role}>
                    Login <ArrowRight className="ml-2" size={16} />
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup" className="mt-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" type="text" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label>I am a:</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Button
                        type="button"
                        variant={role === "patient" ? "default" : "outline"}
                        className="flex items-center justify-center gap-2"
                        onClick={() => setRole("patient")}
                      >
                        <User size={18} />
                        Patient
                      </Button>
                      <Button
                        type="button"
                        variant={role === "doctor" ? "default" : "outline"}
                        className="flex items-center justify-center gap-2"
                        onClick={() => setRole("doctor")}
                      >
                        <Stethoscope size={18} />
                        Doctor
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={!role}>
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          {/* <CardFooter className="flex flex-col items-center justify-center text-sm text-muted-foreground">
            <p className="flex items-center gap-1">
              <AlertCircle size={14} />
              Demo credentials: patient@example.com / doctor@example.com
            </p>
          </CardFooter> */}
        </Card>

        <div className="mt-8 flex justify-center space-x-4">
          <div className="text-center">
            <Avatar className="h-16 w-16 mx-auto border-2 border-primary">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=patient"
                alt="Patient"
              />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <h3 className="mt-2 font-medium">Patient Portal</h3>
            <p className="text-sm text-muted-foreground">
              Chat with your AI health assistant
            </p>
          </div>

          <div className="text-center">
            <Avatar className="h-16 w-16 mx-auto border-2 border-primary">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=doctor"
                alt="Doctor"
              />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <h3 className="mt-2 font-medium">Doctor Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Monitor patient interactions
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
