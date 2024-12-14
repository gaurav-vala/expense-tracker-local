import "./App.css";
import QueryExpense from "./components/QueryExpense";
import ListExpense from "./components/ListExpense";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  // const [theme, setTheme] = useState<Theme>(() => "dark");
  return (
    <ThemeProvider>
      <div className="container px-5 mx-auto mt-6 mb-8 sm:max-w-3xl">
        <div className="flex justify-between gap-8">
          <div>
            <h1 className="text-3xl tracking-tighter noto-serif-display">
              My Minimal Expense Tracker
            </h1>
            <p className="mt-3 leading-tight tracking-tight text-neutral-500">
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
