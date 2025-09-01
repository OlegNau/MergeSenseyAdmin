import { useState } from "react";
import { Send, MessageCircle, Search, ChevronDown, ChevronRight, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/contexts/language-context";

export function Help() {
  const { t } = useTranslation();
  type ChatMessage = {
    id: string;
    type: "bot" | "user";
    message: string;
    timestamp: Date;
  };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      message: "Hello! I'm your AI assistant. How can I help you with your pipelines today?",
      timestamp: new Date(),
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqItems = [
    {
      id: "1",
      question: "How do I create a new pipeline?",
      answer: "To create a new pipeline, navigate to your project page and click the 'Configure Pipeline' button. This will open a step-by-step wizard that guides you through naming your pipeline, selecting AI agents, and setting trigger conditions."
    },
    {
      id: "2",
      question: "What AI agents are available?",
      answer: "We offer several AI agents including Code Review (automated code quality analysis), Security Scanner (vulnerability detection), Performance Analyzer (bottleneck detection), Test Generator (automatic test creation), Documentation AI (auto-documentation), and API Validator (contract validation)."
    },
    {
      id: "3",
      question: "How do pipeline triggers work?",
      answer: "Pipeline triggers determine when your pipeline runs automatically. You can set triggers for push events to specific branches (main, staging, production), pull request creation, scheduled runs (daily/weekly), or manual execution only."
    },
    {
      id: "4",
      question: "Can I modify an existing pipeline?",
      answer: "Yes, you can edit pipeline settings by going to the project detail page, finding your pipeline in the list, and clicking 'View Details'. From there you can modify the name, enabled agents, and trigger conditions."
    },
    {
      id: "5",
      question: "How do I interpret pipeline results?",
      answer: "Pipeline results show the status (Active/Inactive), last run time, and detailed reports from each AI agent. Green status indicates successful runs, while red indicates issues that need attention. Click 'View Details' for comprehensive reports."
    },
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: chatInput,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: "I understand your question. Let me help you with that. Could you provide more details about what specific aspect you'd like to know more about?",
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="text-help-title">
          {t('help.title')}
        </h1>
        <p className="text-muted-foreground mt-1" data-testid="text-help-subtitle">
          {t('help.subtitle')}
        </p>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faq" data-testid="tab-faq">
            <Search className="w-4 h-4 mr-2" />
            {t('help.faq')}
          </TabsTrigger>
          <TabsTrigger value="chat" data-testid="tab-chat">
            <MessageCircle className="w-4 h-4 mr-2" />
            {t('help.aiAssistant')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card data-testid="card-faq">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-border rounded-lg"
                    data-testid={`faq-item-${item.id}`}
                  >
                    <button
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                      onClick={() => toggleFaq(item.id)}
                      data-testid={`faq-question-${item.id}`}
                    >
                      <span className="font-medium">{item.question}</span>
                      {expandedFaq === item.id ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    {expandedFaq === item.id && (
                      <div 
                        className="p-4 border-t border-border bg-muted/20"
                        data-testid={`faq-answer-${item.id}`}
                      >
                        <p className="text-muted-foreground">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card data-testid="card-ai-chat">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="h-96 border border-border rounded-lg p-4 overflow-y-auto space-y-4"
                  data-testid="chat-messages"
                >
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      data-testid={`chat-message-${message.id}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Textarea
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything about pipelines..."
                    className="min-h-[60px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    data-testid="textarea-chat-input"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    data-testid="button-send-message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}