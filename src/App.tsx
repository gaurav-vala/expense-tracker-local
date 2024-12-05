import "./App.css";
import AddExpense from "./components/AddExpense";
import AddIncome from "./components/AddIncome";
import QueryExpense from "./components/QueryExpense";
<<<<<<< HEAD
import ListExpense from "./components/ListExpense";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  // const [theme, setTheme] = useState<Theme>(() => "dark");
  return (
    <ThemeProvider>
      <div className="container md:max-w-5xl mx-auto px-5 my-8">
        <div className="flex gap-8 justify-between">
          <div>
            <h1 className="font-extrabold text-3xl tracking-tighter">
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

        <div className="flex items-center flex-col gap-4 mt-11 fixed bottom-0 w-full left-0 px-5 py-4 bg-white dark:bg-neutral-950 border border-t-2">
          <AddIncome />
          <AddExpense />
        </div>
        <div className="mt-4">
          <QueryExpense />
        </div>
      </div>
    </ThemeProvider>
=======

function App() {
  return (
    <>
      <h1>My simple Dexie app</h1>

      <AddIncome />

      <br />

      <AddExpense />
      <QueryExpense />
    </>
>>>>>>> c6173b1 (Resolve merge conflicts)
  );
}

export default App;
