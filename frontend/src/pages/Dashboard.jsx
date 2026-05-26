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
  Utensils,
  Car,
  Film,
  Bolt,
  Pencil,
  Trash2,
  ShoppingBag,
  Receipt,
} from "lucide-react";

import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} from "../services/expenseService";

import logo from "../assets/logo.png";

import AddExpenseModal from "../components/auth/AddExpenseModal";

import DeleteConfirmationModal from "../components/auth/DeleteConfirmationModal";

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

  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

  const [expenseToDelete, setExpenseToDelete] =
  useState(null);

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

const getCategoryIcon = (category) => {

  switch (category) {

    case "Food":
      return <Utensils size={22} className="text-orange-500" />;

    case "Travel":
      return <Car size={22} className="text-blue-500" />;

    case "Entertainment":
      return <Film size={22} className="text-purple-500" />;

    case "Bills":
      return <Bolt size={22} className="text-yellow-500" />;

    case "Shopping":
      return <ShoppingBag size={22} className="text-pink-500" />;

    default:
      return <Receipt size={22} className="text-gray-500" />;

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
      <div className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm mb-10">

      <div className="mb-6">
      
        <h2 className="text-4xl font-extrabold tracking-tight">
      
          <span className="text-[#4B1D83]">
      
            Analytics
      
          </span>
      
          <span className="text-[#FF4F9A]">
      
            Overview
      
          </span>
      
        </h2>
      
        <p className="text-gray-500 mt-1 text-sm">
      
          Visual insights of your spending patterns
      
        </p>
      
      </div>

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

      </div>

      {/* EXPENSE TRACK */}
      <div className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm">

      <div className="mb-6">
      
        <h2 className="text-4xl font-extrabold tracking-tight">
      
          <span className="text-[#4B1D83]">
      
            Expense
      
          </span>
      
          <span className="text-[#FF4F9A]">
      
            s
      
          </span>
      
        </h2>
      
        <p className="text-gray-500 mt-1 text-sm">
      
          Manage and track your daily transactions
      
        </p>
      
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

            <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-16 text-center">

              <div className="flex justify-center mb-5">
            
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-[#4B1D83] to-[#FF4F9A] flex items-center justify-center text-white text-3xl shadow-xl">
                  ₹
                </div>
            
              </div>
            
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No Expenses Found
              </h2>
            
              <p className="text-gray-500 mb-6">
                Start tracking your spending by adding your first expense.
              </p>
            
              <button
                onClick={() => setShowAddExpense(true)}
                className="bg-gradient-to-r from-[#4B1D83] to-[#FF4F9A] text-white px-6 py-3 rounded-2xl shadow-lg hover:opacity-90 transition-all"
              >
                Add Expense
              </button>
            
            </div>

          ) : (

            filteredExpenses.map((expense) => (

              <div
                key={expense.id}
                className="bg-white border border-gray-200 rounded-3xl px-6 py-5 flex items-center justify-between hover:shadow-lg transition-all duration-300"
              >
              
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
              
                  {/* ICON BOX */}
                  <div className="h-14 w-14 rounded-2xl bg-gray-100 flex items-center justify-center">
              
                    {getCategoryIcon(expense.category)}
              
                  </div>
              
                  {/* DETAILS */}
                  <div>
              
                    <h3 className="text-xl font-semibold text-gray-800">
              
                      {expense.title}
              
                    </h3>
              
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
              
                      <p className="text-gray-400 text-sm">
              
                        {expense.date}
              
                      </p>
              
                      <span className="text-gray-300">
              
                        •
              
                      </span>
              
                      <p className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
              
                        {expense.category}
              
                      </p>
              
                    </div>
              
                  </div>
              
                </div>
              
                {/* RIGHT SIDE */}
                <div className="flex items-center gap-5">
              
                  {/* AMOUNT */}
                  <p className="text-2xl font-bold text-[#4B1D83]">
              
                    ₹ {expense.amount}
              
                  </p>
              
                  {/* ACTION BUTTONS */}
                  <div className="flex items-center gap-2">
              
                    {/* EDIT */}
                    <button
                      onClick={() => {
              
                        setEditingExpense(expense);
              
                        setTitle(expense.title);
              
                        setAmount(expense.amount);
              
                        setCategory(expense.category);
              
                        setDate(expense.date);
              
                        setShowAddExpense(true);
              
                      }}
                      className="p-2 rounded-xl hover:bg-gray-100 transition-all"
                    >
              
                      <Pencil
                        size={18}
                        className="text-gray-600"
                      />
              
                    </button>
              
                    {/* DELETE */}
                    <button
                      onClick={() => {

                        setExpenseToDelete(expense.id);
                      
                        setShowDeleteModal(true);
                      
                      }}
                      className="p-2 rounded-xl hover:bg-red-50 transition-all"
                    >
              
                      <Trash2
                        size={18}
                        className="text-red-500"
                      />
              
                    </button>
              
                  </div>
              
                </div>
              
              </div>

            ))

          )

        }

      </div>
      
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

      {
        showDeleteModal && (
      
          <DeleteConfirmationModal
      
            setShowDeleteModal={
              setShowDeleteModal
            }
      
            handleConfirmDelete={async () => {
      
              await handleDeleteExpense(
                expenseToDelete
              );
      
              setShowDeleteModal(false);
      
              setExpenseToDelete(null);
      
            }}
      
          />
      
        )
      }

    </div>

  );

}

export default Dashboard;