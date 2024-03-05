import { useState } from "react";
import ExpenseItem from "./components/ExpenseItem";
import NewExpenseItem from "./components/NewExpenseItem";
export default function Application() {
  const intialExpenses = [
    {
      id: "e1",
      amount: 50,
      price: 1250,
      //date: new Date(),
      plawatListObject: [],
      inputIsPaid: true,
      inputPaidPart: null,
    },
    {
      id: "e2",
      amount: 70,
      price: 799.49,
      //date: new Date(),
      plawatListObject: [],
      inputIsPaid: true,
      inputPaidPart: null,
    },
    {
      id: "e3",
      amount: 20,
      price: 450.65,
      //date: new Date(),
      plawatListObject: [],
      inputIsPaid: true,
      inputPaidPart: null,
    },
    {
      id: "e4",
      amount: 90,
      price: 390.25,
      //date: new Date(),
      plawatListObject: [],
      inputIsPaid: false,
      inputPaidPart: 500,
    },
  ];
  
  const [expenses, setExpenses] = useState(intialExpenses);
  function saveExpense(expense) {
    const newExpense = {
      id: Math.random(),
      amount: expense.amount,
      price: expense.amount * 25,
      //date: expense.date === "Invalid Date" ? new Date() : expense.date,
      plawatListObject: expense.plawatListObject,
      inputIsPaid: expense.inputIsPaid,
      inputPaidPart: expense.inputPaidPart,
    };
    setExpenses([newExpense, ...expenses]);
    localStorage.setItem('expensesData', JSON.stringify(expenses));    
  }
  function handeDeleteExpense(wantedExpenseToDelete){
    expenses.map((expense) => {
      if (expense === wantedExpenseToDelete) {
        let tempExpenses = expenses;
        const index = expenses.indexOf(expense);
        tempExpenses.splice(index, 1);
        setExpenses([...tempExpenses]);
      }
      return expenses; // i did return just to avoid the borning warning in the console
    });
  }
  let totalPrice = 0;
  let totalAmount = 0;
  function displayingTotalPrice(){
    expenses.map((exp)=> {
      return totalPrice +=Number(exp.price);
    })
    return totalPrice.toFixed(2);
  }
  function displayingTotalAmount(){
    expenses.map((exp)=>{
      return totalAmount +=Number(exp.amount);
    })
    return totalAmount;
  }
  
  return (
    <div className="app">
      <div className="displaying_total_status">
        <h3>Total Amount: {displayingTotalAmount()}</h3>
        <h2>Total Price: {displayingTotalPrice()} DZ</h2>
      </div>
      <NewExpenseItem onSaveExpense={saveExpense} />
      {expenses.map((expense) => (
        <ExpenseItem
          expenseObject={expense}
          key={expense.id}
          amount={expense.amount}
          price={expense.price}
          date={expense.date}
          plawatListObject={expense.plawatListObject}
          isPaid={expense.inputIsPaid}
          inputPaidPart= {expense.inputPaidPart}
          handeDeleteExpense={handeDeleteExpense}
        />
      ))}
    </div>
  );
}
