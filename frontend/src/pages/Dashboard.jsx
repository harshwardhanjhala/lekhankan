import { useEffect, useState } from "react";

import {
  DollarSign,
  TrendingUp,
  CreditCard,
  LogOut,
  PlusCircle,
} from "lucide-react";

import {
  addExpense,
  getExpenses,
  deleteExpense,
} from "../services/expenseService";

import logo from "../assets/logo.png";

import AddExpenseModal from "../components/auth/AddExpenseModal";

function Dashboard({
  user,
  onLogout,
}) {

  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("");

  const [date, setDate] = useState("");

  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showAddExpense, setShowAddExpense] = useState(false);

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
      !category || !date
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

        date,

        user_id: user.id,

      });

      setTitle("");

      setAmount("");

      setCategory("");

      setDate("");

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

    <div className="min-h-screen bg-[#faf7ff]">

      {/* NAVBAR */}
      
      <div className="bg-white border-b border-gray-200 px-10 py-4 flex items-center justify-between">
      
        <div className="flex items-center gap-3">
      
          <img
            src={logo}
            alt="logo"
            className="h-14"
          />
      
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4B1D83] to-[#FF4F9A] bg-clip-text text-transparent">
            Lekhankan
          </h1>
      
        </div>
      
        <div className="flex items-center gap-5">
      
          <button
            onClick={() => setShowAddExpense(true)}
            className="bg-gradient-to-r from-[#4B1D83] to-[#FF4F9A] text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
          >
      
            <PlusCircle size={20} />
      
            Add Expense
      
          </button>
      
          <button
            onClick={onLogout}
            className="flex items-center gap-2 font-medium"
          >
      
            <LogOut size={20} />
      
            Logout
      
          </button>
      
        </div>
      
      </div>

      <div className="px-10 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* TOTAL EXPENSES */}
        
          <div className="bg-white p-8 rounded-3xl border border-gray-200">
        
            <div className="flex justify-between items-start mb-6">
        
              <p className="text-gray-500 text-lg">
                Total Expenses
              </p>
        
              <DollarSign className="text-[#4B1D83]" />
        
            </div>
        
            <h2 className="text-4xl font-bold mb-2">
              ₹ {totalExpenses}
            </h2>
        
            <p className="text-gray-400">
              All time
            </p>
        
          </div>
        
          {/* TRANSACTIONS */}
        
          <div className="bg-white p-8 rounded-3xl border border-gray-200">
        
            <div className="flex justify-between items-start mb-6">
        
              <p className="text-gray-500 text-lg">
                This Month
              </p>
        
              <TrendingUp className="text-pink-500" />
        
            </div>
        
            <h2 className="text-4xl font-bold mb-2">
              {expenses.length}
            </h2>
        
            <p className="text-gray-400">
              Transactions
            </p>
        
          </div>
        
          {/* CATEGORY */}
        
          <div className="bg-white p-8 rounded-3xl border border-gray-200">
        
            <div className="flex justify-between items-start mb-6">
        
              <p className="text-gray-500 text-lg">
                Categories
              </p>
        
              <CreditCard className="text-green-500" />
        
            </div>
        
            <h2 className="text-4xl font-bold mb-2">
        
              {[...new Set(expenses.map((e) => e.category))].length}
        
            </h2>
        
            <p className="text-gray-400">
              Active categories
            </p>
        
          </div>
        
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
                className="bg-white p-6 rounded-3xl border border-gray-200 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-semibold text-lg">

                    {expense.title}

                  </h3>

                  <div>
                  
                    <p className="text-pink-500 text-sm font-medium">
                      {expense.category}
                    </p>
                  
                    <p className="text-gray-400 text-sm mt-1">
                      {expense.date}
                    </p>
                  
                  </div>

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

      {
        showAddExpense && (
          <AddExpenseModal
            setShowAddExpense={setShowAddExpense}
            title={title}
            setTitle={setTitle}
            amount={amount}
            setAmount={setAmount}
            category={category}
            setCategory={setCategory}
            date={date}
            setDate={setDate}
            handleAddExpense={handleAddExpense}
            loading={loading}
          />
        )
      }

    </div>

  );

}

export default Dashboard;