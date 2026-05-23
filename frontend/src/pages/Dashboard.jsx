import { useEffect, useState } from "react";

import {
  addExpense,
  getExpenses,
  deleteExpense,
} from "../services/expenseService";

function Dashboard({
  user,
  onLogout,
}) {

  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("");

  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(false);

  const totalExpenses = expenses.reduce(

  (total, expense) =>

    total + Number(expense.amount),

  0

);

  // FETCH EXPENSES

  const fetchExpenses = async () => {

    try {

      const data = await getExpenses(
        user.id
      );

      setExpenses(data);

    } catch (error) {

      console.log(error.message);

    }

  };

  useEffect(() => {

    fetchExpenses();

  }, []);

  // ADD EXPENSE

  const handleAddExpense = async (
    e
  ) => {

    e.preventDefault();

    if (
      !title ||
      !amount ||
      !category
    ) {

      return alert(
        "Please fill all fields"
      );

    }

    try {

      setLoading(true);

      await addExpense({

        title,

        amount,

        category,

        user_id: user.id,

      });

      setTitle("");

      setAmount("");

      setCategory("");

      fetchExpenses();

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  const handleDeleteExpense = async (
  expenseId
) => {

  try {

    await deleteExpense(
      expenseId
    );

    fetchExpenses();

  } catch (error) {

    alert(error.message);

  }

};

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* TOP BAR */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-3xl font-bold">

            Dashboard

          </h1>

          <p className="text-gray-600">

            Welcome,
            {" "}
            {user.email}

          </p>

        </div>

        <button
          onClick={onLogout}
          className="bg-black text-white px-5 py-2 rounded-lg"
        >

          Logout

        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
        {/* TOTAL SPENT */}
      
        <div className="bg-white p-6 rounded-2xl shadow-md">
      
          <p className="text-gray-500 mb-2">
      
            Total Expenses
      
          </p>
      
          <h2 className="text-3xl font-bold">
      
            ₹ {totalExpenses}
      
          </h2>
      
        </div>
      
        {/* TOTAL TRANSACTIONS */}
      
        <div className="bg-white p-6 rounded-2xl shadow-md">
      
          <p className="text-gray-500 mb-2">
      
            Total Transactions
      
          </p>
      
          <h2 className="text-3xl font-bold">
      
            {expenses.length}
      
          </h2>
      
        </div>
      
        {/* LATEST CATEGORY */}
      
        <div className="bg-white p-6 rounded-2xl shadow-md">
      
          <p className="text-gray-500 mb-2">
      
            Latest Category
      
          </p>
      
          <h2 className="text-2xl font-bold">
      
            {
      
              expenses[0]?.category ||
      
              "No Data"
      
            }
      
          </h2>
      
        </div>
      
      </div>

      {/* ADD EXPENSE FORM */}

      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

        <h2 className="text-2xl font-semibold mb-5">

          Add Expense

        </h2>

        <form
          onSubmit={handleAddExpense}
          className="grid gap-4"
        >

          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border p-3 rounded-lg"
          >
          
            <option value="">
              Select Category
            </option>
          
            <option value="Food">
              Food
            </option>
          
            <option value="Travel">
              Travel
            </option>
          
            <option value="Shopping">
              Shopping
            </option>
          
            <option value="Bills">
              Bills
            </option>
          
            <option value="Entertainment">
              Entertainment
            </option>
          
            <option value="Other">
              Other
            </option>
          
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 rounded-lg"
          >

            {
              loading
                ? "Adding..."
                : "Add Expense"
            }

          </button>

        </form>

      </div>

      {/* EXPENSES LIST */}

      <div className="grid gap-4">

        {

          expenses.length === 0 ? (

            <p className="text-gray-500">

              No expenses added yet.

            </p>

          ) : (

            expenses.map((expense) => (

              <div
                key={expense.id}
                className="bg-white p-5 rounded-2xl shadow-md flex justify-between items-center"
              >

                <div>

                  <h3 className="font-semibold text-lg">

                    {expense.title}

                  </h3>

                  <p className="text-gray-500">

                    {expense.category}

                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <p className="font-bold text-xl">
                
                    ₹ {expense.amount}
                
                  </p>
                
                  <button
                    onClick={() =>
                      handleDeleteExpense(
                        expense.id
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                
                    Delete
                
                  </button>
                
                </div>

              </div>

            ))

          )

        }

      </div>

    </div>

  );

}

export default Dashboard;