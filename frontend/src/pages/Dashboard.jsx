import { useEffect, useState } from "react";

import {
  addExpense,
  getExpenses,
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

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

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

                <p className="font-bold text-xl">

                  ₹ {expense.amount}

                </p>

              </div>

            ))

          )

        }

      </div>

    </div>

  );

}

export default Dashboard;