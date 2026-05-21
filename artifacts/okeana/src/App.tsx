import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";
import { BookingModal } from "@/components/booking-modal";

import Home from "@/pages/home";
import About from "@/pages/about";
import Programs from "@/pages/programs";
import Prices from "@/pages/prices";
import Schedule from "@/pages/schedule";
import AboutPool from "@/pages/about-pool";
import Team from "@/pages/team";
import Gallery from "@/pages/gallery";
import Contacts from "@/pages/contacts";
import Blog from "@/pages/blog";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/programs" component={Programs} />
        <Route path="/prices" component={Prices} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/about-pool" component={AboutPool} />
        <Route path="/team" component={Team} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/blog" component={Blog} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
          <BookingModal />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;