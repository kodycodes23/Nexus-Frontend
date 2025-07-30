import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  Mic,
  PlusCircle,
  Calendar,
  FileText,
  Activity,
  AlertCircle,
} from "lucide-react";
import HealthDataPanel from "./HealthDataPanel";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you with your health today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");

    // Simulate AI typing
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I understand your concern. Based on your recent health data, I can see your heart rate has been slightly elevated. Would you like me to analyze this pattern further?",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1 p-4">
        <Card className="flex flex-col h-full border bg-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Health Assistant</CardTitle>
              <div className="flex space-x-2">
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800"
                >
                  Connected
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  Data Synced
                </Badge>
              </div>
            </div>
            <Separator className="my-2" />
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            <Tabs defaultValue="chat" className="h-full flex flex-col">
              <TabsList className="mx-4 justify-start">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent
                value="chat"
                className="flex overflow-hidden mt-0 pt-0"
              >
                <div className="flex flex-1 overflow-hidden border-t pt-4">
                  <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-[calc(100vh-240px)] pr-4 pl-2">
                      <div className="flex flex-col space-y-4 pb-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div className="flex items-end space-x-2">
                              {message.sender === "ai" && (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=health-ai"
                                    alt="AI"
                                  />
                                  <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                              )}

                              <div
                                className={`max-w-md rounded-lg px-4 py-2 ${
                                  message.sender === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                }`}
                              >
                                <p>{message.content}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>

                              {message.sender === "user" && (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=patient"
                                    alt="You"
                                  />
                                  <AvatarFallback>You</AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          </div>
                        ))}

                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="flex items-end space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=health-ai"
                                  alt="AI"
                                />
                                <AvatarFallback>AI</AvatarFallback>
                              </Avatar>
                              <div className="bg-muted rounded-lg px-4 py-2">
                                <div className="flex space-x-1">
                                  <div
                                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                    style={{ animationDelay: "0ms" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                    style={{ animationDelay: "150ms" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                    style={{ animationDelay: "300ms" }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="w-[350px] border-l pl-4 hidden md:block">
                    <HealthDataPanel />
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="insights"
                className="overflow-auto mt-0 border-t pt-0"
              >
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-4">Health Insights</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-5 w-5 text-amber-500" />
                          <h4 className="font-medium">
                            Elevated Heart Rate Pattern
                          </h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Your heart rate shows elevation during evening hours.
                          This pattern has been consistent for the past week.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-5 w-5 text-green-500" />
                          <h4 className="font-medium">
                            Sleep Quality Improving
                          </h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Your sleep quality has improved by 15% over the last
                          two weeks based on your wearable data.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="history"
                className="overflow-auto mt-0 border-t pt-0"
              >
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-4">
                    Conversation History
                  </h3>
                  <div className="space-y-2">
                    <Card className="cursor-pointer hover:bg-muted/50">
                      <CardContent className="p-3">
                        <p className="font-medium">
                          Discussion about headaches
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Yesterday, 2:30 PM
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:bg-muted/50">
                      <CardContent className="p-3">
                        <p className="font-medium">
                          Medication schedule review
                        </p>
                        <p className="text-sm text-muted-foreground">
                          May 15, 10:15 AM
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:bg-muted/50">
                      <CardContent className="p-3">
                        <p className="font-medium">Sleep pattern analysis</p>
                        <p className="text-sm text-muted-foreground">
                          May 10, 8:45 PM
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="pt-2">
            <div className="flex flex-col w-full space-y-2">
              <div className="flex space-x-2 mb-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Appointment</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <FileText className="h-4 w-4" />
                  <span>Review Symptoms</span>
                </Button>
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message here..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <PlusCircle className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;
