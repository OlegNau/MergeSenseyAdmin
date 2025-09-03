import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  message: string;
  timestamp: Date;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpComponent {
  // TODO: i18n
  activeTab = 'faq';

  chatMessages: ChatMessage[] = [
    {
      id: '1',
      type: 'bot',
      message:
        "Hello! I'm your AI assistant. How can I help you with your pipelines today?",
      timestamp: new Date(),
    },
  ];

  chatInput = '';
  expandedFaq: string | null = null;

  faqItems: FaqItem[] = [
    {
      id: '1',
      question: 'How do I create a new pipeline?',
      answer:
        "Go to a project and click 'Create Pipeline'. Follow the 4-step wizard to configure your pipeline with AI agents and triggers.",
    },
    {
      id: '2',
      question: 'What AI agents are available?',
      answer:
        'We offer several AI agents including Code Review (automated code quality analysis), Security Scanner (vulnerability detection), Performance Analyzer (bottleneck detection), Test Generator (automatic test creation), Documentation AI (auto-documentation), and API Validator (contract validation).',
    },
    {
      id: '3',
      question: 'How do pipeline triggers work?',
      answer:
        'Pipeline triggers determine when your pipeline runs automatically. You can set triggers for push events to specific branches (main, staging, production), pull request creation, scheduled runs (daily/weekly), or manual execution only.',
    },
    {
      id: '4',
      question: 'Can I modify an existing pipeline?',
      answer:
        "Yes, you can edit pipeline settings by going to the project detail page, finding your pipeline in the list, and clicking 'View Details'. From there you can modify the name, enabled agents, and trigger conditions.",
    },
    {
      id: '5',
      question: 'How do I interpret pipeline results?',
      answer:
        "Pipeline results show the status (Active/Inactive), last run time, and detailed reports from each AI agent. Green status indicates successful runs, while red indicates issues that need attention. Click 'View Details' for comprehensive reports.",
    },
  ];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  toggleFaq(id: string) {
    this.expandedFaq = this.expandedFaq === id ? null : id;
  }

  handleSendMessage() {
    if (!this.chatInput.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: this.chatInput,
      timestamp: new Date(),
    };

    this.chatMessages = [...this.chatMessages, userMessage];
    this.chatInput = '';

    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message:
          "I understand your question. Let me help you with that. Could you provide more details about what specific aspect you'd like to know more about?",
        timestamp: new Date(),
      };
      this.chatMessages = [...this.chatMessages, botResponse];
    }, 1000);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSendMessage();
    }
  }
}
