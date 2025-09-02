import { Bell, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.png" 
            alt="Merge Sensei Logo" 
            className="h-32 w-32 object-contain"
          />
        </div>
        
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                data-testid="input-search-projects"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" data-testid="button-notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" data-testid="button-settings">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" data-testid="button-user-profile">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}