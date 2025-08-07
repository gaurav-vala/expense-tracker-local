import "./App.css";
import { ThemeProvider } from "./components/theme-provider";

import { BadgeIndianRupee, Mail } from "lucide-react";
import DataListing from "./components/CombinedList";
import ExpenseData from "./components/ListExpense";
import ThemeToggle from "./components/ThemeToggle";
import { Button } from "./components/ui/button";

function App() {
  // const [theme, setTheme] = useState<Theme>(() => "dark");

  return (
    <ThemeProvider>
      <div className="container px-5 mx-auto mt-6 mb-8 sm:max-w-3xl">
        <div className="flex items-center justify-between gap-8">
          <div>
            <h1 className="flex items-center gap-1 text-3xl font-bold tracking-tight noto-serif-display">
              <BadgeIndianRupee size={30} /> Pennywise
            </h1>
            <p className="mt-2 leading-tight tracking-tight text-neutral-500">
              Your Finance Journey, Powered by Me.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              title="Toggle theme"
            >
              <Mail className="w-6 h-6 text-neutral-500" />
            </Button>
            <ThemeToggle />
          </div>
        </div>

        <ExpenseData />
        <div className="mt-4">
          <DataListing />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
