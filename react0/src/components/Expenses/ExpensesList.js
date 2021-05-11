import React from 'react';
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = props => {
    let expenses = props.items.length === 0 ? <h2 className="expenses-list__fallback">No Expenses</h2> : props.items.map(expense => <ExpenseItem date={expense.date} title={expense.title} amount={expense.amount} key={expense.id} />)

    return (
        <ul className="expenses-list">
            {expenses}
        </ul>
    )
}

export default ExpensesList;