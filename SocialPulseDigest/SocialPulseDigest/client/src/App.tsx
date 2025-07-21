import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-context";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Home from "@/pages/home";
import Onboarding from "@/pages/onboarding";
import DigestHistory from "@/pages/digest-history";
import NotFound from "@/pages/not-found";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Home as HomeIcon, History, Settings, User } from "lucide-react";

function Navigation() {
  const [location] = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="font-bold text-xl text-foreground">Finclvr</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <Button 
              variant={location === "/" ? "default" : "ghost"}
              className="flex items-center space-x-2"
            >
              <HomeIcon className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
          </Link>
          <Link href="/history">
            <Button 
              variant={location === "/history" ? "default" : "ghost"}
              className="flex items-center space-x-2"
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button 
              variant={location === "/onboarding" ? "default" : "ghost"}
              className="flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <div className="pt-16">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/history" component={DigestHistory} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Navigation />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
