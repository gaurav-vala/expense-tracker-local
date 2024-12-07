import "./App.css";
import AddExpense from "./components/AddExpense";
import AddIncome from "./components/AddIncome";
import QueryExpense from "./components/QueryExpense";
import ListExpense from "./components/ListExpense";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  // const [theme, setTheme] = useState<Theme>(() => "dark");
  return (
    <ThemeProvider>
      <div className="container px-5 mx-auto mt-6 mb-8 md:max-w-5xl">
        <div className="flex justify-between gap-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter">
              My Minimal Expense Tracker
            </h1>
            <p className="text-neutral-400">
              This is a Local Finance Tracker where the data stays on your
              device
            </p>
          </div>
          <ModeToggle />
        </div>

        <ListExpense />
        <div className="mt-4">
          <QueryExpense />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
