'use client'
import { useState } from "react";
interface Expense{
  id: number;
  name: string;
  cost: number;
}
export default function Home(){
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const addExpense = () => {
    if (!name || !cost || isNaN(Number(cost))) return;
    const newExpense: Expense = {
      id: Date.now(),
      name,
      cost: Number(cost),
    };
    setExpenses([...expenses, newExpense]);
    setName("");
    setCost("");
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalCost = expenses.reduce((acc, expense) => acc + expense.cost, 0);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-800 shadow-lg ">
    <h2 className="text-xl font-bold mb-4 text-center">Expense Tracker</h2>
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={addExpense}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add
      </button>
    </div>
    <ul>
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="flex justify-between items-center p-2 bg-slate-50 my-4"
        >
          <span>{expense.name} - ${expense.cost}</span>
          <button
            onClick={() => removeExpense(expense.id)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
    <div className="text-right font-bold mt-4">Total: ${totalCost}</div>
  </div>
  );
}
