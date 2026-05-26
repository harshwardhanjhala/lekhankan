import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [

  "#4B1D83",
  "#FF4F9A",
  "#7C3AED",
  "#EC4899",
  "#8B5CF6",
  "#F472B6",

];

import {
  DollarSign,
  IndianRupeeIcon,
  TrendingUp,
  CreditCard,
  LogOut,
  PlusCircle,
  Search,
  Filter,
} from "lucide-react";

import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
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

  const [searchTerm, setSearchTerm] = useState("");

  const [filterCategory, setFilterCategory] =
  useState("All");

  const [timeFilter, setTimeFilter] =
  useState("All");

  const [loading, setLoading] = useState(false);

  const [showAddExpense, setShowAddExpense] = useState(false);

  const [editingExpense, setEditingExpense] = useState(null);

  const filteredExpenses = expenses.filter(
  (expense) => {

    // SEARCH FILTER

    const matchesSearch =

      expense.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    // CATEGORY FILTER

    const matchesCategory =

      filterCategory === "All" ||

      expense.category ===
        filterCategory;

    // TIME FILTER

    const expenseDate = new Date(
      expense.date
    );

    const today = new Date();

    let matchesTime = true;

    // THIS WEEK

    if (timeFilter === "Week") {

      const weekAgo = new Date();

      weekAgo.setDate(
        today.getDate() - 7
      );

      matchesTime =
        expenseDate >= weekAgo;

    }

    // THIS MONTH

    else if (
      timeFilter === "Month"
    ) {

      matchesTime =

        expenseDate.getMonth() ===
          today.getMonth() &&

        expenseDate.getFullYear() ===
          today.getFullYear();

    }

    // THIS YEAR

    else if (
      timeFilter === "Year"
    ) {

      matchesTime =

        expenseDate.getFullYear() ===
        today.getFullYear();

    }

    return (

      matchesSearch &&
      matchesCategory &&
      matchesTime

    );

  }
);

  const totalExpenses = filteredExpenses.reduce(

  (total, expense) =>

    total + Number(expense.amount),

  0

);

// CATEGORY DATA FOR PIE CHART

const categoryData = Object.values(

  filteredExpenses.reduce((acc, expense) => {

    if (!acc[expense.category]) {

      acc[expense.category] = {

        name: expense.category,
        value: 0,

      };

    }

    acc[expense.category].value += Number(expense.amount);

    return acc;

  }, {})

);

// MONTHLY DATA FOR BAR CHART

const monthlyData = Object.values(

  filteredExpenses.reduce((acc, expense) => {

    const month = new Date(
      expense.date
    ).toLocaleString("default", {

      month: "short",

    });

    if (!acc[month]) {

      acc[month] = {

        month,
        amount: 0,

      };

    }

    acc[month].amount += Number(
      expense.amount
    );

    return acc;

  }, {})

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

      if (editingExpense) {
      
        await updateExpense(
      
          editingExpense.id,
      
          {
            title,
            amount,
            category,
            date,
          }
      
        );
      
      } else {
      
        await addExpense({
      
          title,
          amount,
          category,
          date,
          user_id: user.id,
      
        });
      
      }

      setTitle("");

      setAmount("");

      setCategory("");

      setDate("");

      setEditingExpense(null);

      setShowAddExpense(false);

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

const handleEditExpense = async (
  expenseId,
  updatedExpense
) => {

  try {

    await updateExpense(
      expenseId,
      updatedExpense
    );

    fetchExpenses();

    setEditingExpense(null);

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
      
          <div>
        
            <h1 className="text-4xl font-extrabold tracking-tight leading-none">

              <span className="text-[#4B1D83]">
                Lekhan
              </span>
            
              <span className="text-[#FF4F9A]">
                kan
              </span>
            
            </h1>
        
            <p className="text-sm text-gray-500">
        
              Welcome back,
              {" "}
        
              {
                user.user_metadata?.full_name ||
                user.email
              }
        
            </p>
        
          </div>
      
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
        
              <IndianRupeeIcon className="text-[#4B1D83]" />
        
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
                Total Transactions
              </p>
        
              <TrendingUp className="text-pink-500" />
        
            </div>
        
            <h2 className="text-4xl font-bold mb-2">
              {filteredExpenses.length}
            </h2>
        
            <p className="text-gray-400">
              All time
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
        
              {[...new Set(filteredExpenses.map((e) => e.category))].length}
        
            </h2>
        
            <p className="text-gray-400">
              Active categories
            </p>
        
          </div>
        
        </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

      <div className="bg-white rounded-3xl border border-gray-200 p-8 mb-10">
      
        <h2 className="text-2xl font-bold mb-8">
      
          Spending Analytics
      
        </h2>
      
        <div className="w-full h-[400px]">
      
          <ResponsiveContainer>
      
            <PieChart>
      
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label
              >
      
                {
      
                  categoryData.map((entry, index) => (
      
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />
      
                  ))
      
                }
      
              </Pie>
      
              <Tooltip />
      
              <Legend />
      
            </PieChart>
      
          </ResponsiveContainer>
      
        </div>
      
      </div>

      {/* MONTHLY BAR CHART */}

      <div className="bg-white rounded-3xl border border-gray-200 p-8 mb-10">
      
        <h2 className="text-2xl font-bold mb-8">
      
          Monthly Spending
      
        </h2>
      
        <div className="w-full h-[400px]">
      
          <ResponsiveContainer>
      
            <BarChart
              data={monthlyData}
            >
      
              <CartesianGrid
                strokeDasharray="3 3"
              />
      
              <XAxis dataKey="month" />
      
              <YAxis />
      
              <Tooltip />
      
              <Bar
                dataKey="amount"
                fill="#4B1D83"
                radius={[10, 10, 0, 0]}
              />
      
            </BarChart>
      
          </ResponsiveContainer>
      
        </div>
      
      </div>

      </div>

      {/* FILTERS */}
      
      <div className="bg-white rounded-3xl border border-gray-200 p-6 mb-8 flex flex-col lg:flex-row gap-4 lg:items-center">
      
        {/* SEARCH BAR */}
      
        <div className="relative flex-1">
      
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
      
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
      
        </div>
      
        {/* FILTER ICON */}
      
        <div className="hidden lg:flex items-center justify-center">
      
          <Filter
            size={22}
            className="text-gray-500"
          />
      
        </div>
      
        {/* CATEGORY FILTER */}
      
        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value)
          }
          className="border border-gray-200 rounded-2xl px-4 py-3 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
      
          <option value="All">
            All Categories
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
      
        {/* TIME FILTER */}
      
        <select
          value={timeFilter}
          onChange={(e) =>
            setTimeFilter(e.target.value)
          }
          className="border border-gray-200 rounded-2xl px-4 py-3 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
      
          <option value="All">
            All Time
          </option>
      
          <option value="Week">
            This Week
          </option>
      
          <option value="Month">
            This Month
          </option>
      
          <option value="Year">
            This Year
          </option>
      
        </select>
      
      </div>

      {/* EXPENSES LIST */}

      <div className="grid gap-4">

        {

          expenses.length === 0 ? (

            <p className="text-gray-500">

              No expenses added yet.

            </p>

          ) : (

            filteredExpenses.map((expense) => (

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
                    onClick={() => {
                  
                      setEditingExpense(expense);
                  
                      setTitle(expense.title);
                  
                      setAmount(expense.amount);
                  
                      setCategory(expense.category);
                  
                      setDate(expense.date);
                  
                      setShowAddExpense(true);
                  
                    }}
                    className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                  
                    Edit
                  
                  </button>
                
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
            editingExpense={editingExpense}
            handleEditExpense={handleEditExpense}
          />
        )
      }

    </div>

  );

}

export default Dashboard;