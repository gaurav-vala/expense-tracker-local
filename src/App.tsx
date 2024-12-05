import "./App.css";
import AddExpense from "./components/AddExpense";
import AddIncome from "./components/AddIncome";
import QueryExpense from "./components/QueryExpense";

function App() {
  return (
    <>
      <h1>My simple Dexie app</h1>

      <AddIncome />

      <br />

      <AddExpense />
      <QueryExpense />
    </>
  );
}

export default App;
