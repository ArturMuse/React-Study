import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
    const [displayForm, setDisplayForm] = useState(false)

    const displayFormHandler = () => {
        setDisplayForm(!displayForm)
    }

    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        }
        props.onAddExpense(expenseData)
    }

    const form = displayForm ? <ExpenseForm onDisplayForm={displayFormHandler} onSaveExpenseData={saveExpenseDataHandler} /> : <button onClick={displayFormHandler} type="button">Add New Expense</button>

    return <div className="new-expense">
        {form}
    </div>
}

export default NewExpense;