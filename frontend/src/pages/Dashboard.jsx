import { useEffect, useState } from "react";

import Papa from "papaparse";

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

import {
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
  Upload,
  Fuel,
  GraduationCap,
  Stethoscope,
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
import ColumnMappingModal from "../components/auth/ColumnMappingModal";
import ThemeToggle from "../components/ThemeToggle";
import { extractPDFText } from "../services/pdfService";
import { parseStatement } from "../parsers/statementParser";
import PDFPreviewModal from "../components/auth/PDFPreviewModal";
import { importTransactions } from "../services/importService";
import { useTheme } from "../context/ThemeContext";

import {
  getMerchantCategory,
  saveMerchantCategory,
} from "../services/merchantService";

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

  const [visibleExpenses, setVisibleExpenses] = useState(6);

  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

  const [expenseToDelete, setExpenseToDelete] =
  useState(null);

  const [showMappingModal, setShowMappingModal] = useState(false);
  
  const [csvHeaders, setCsvHeaders] = useState([]);
  
  const [csvData, setCsvData] = useState([]);
  
  const [columnMapping, setColumnMapping] = useState({
    date: "",
    title: "",
    amount: "",
  });

  const [importingCSV, setImportingCSV] = useState(false);

  const { chartColors, chartStyles } = useTheme();

  const [pdfTransactions, setPdfTransactions] = useState([]);

  const [showPDFPreview, setShowPDFPreview] = useState(false);
  
  const [importingPDF, setImportingPDF] = useState(false);

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

    const rawCategory =
      expense.category || "Others";

    const category =
      rawCategory.trim().toLowerCase();

    const categoryName =
      category === "other" || category === "others"
        ? "Others"
        : rawCategory.trim();

    if (!acc[categoryName]) {

      acc[categoryName] = {
        name: categoryName,
        value: 0,
      };

    }

    acc[categoryName].value += Number(
      expense.amount
    );

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

useEffect(() => {

  setVisibleExpenses(6);

}, [
  searchTerm,
  filterCategory,
  timeFilter
]);

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
      
        // Learn this merchant's category
        await saveMerchantCategory(
          user.id,
          title,
          category
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

    }  catch (error) {

  console.error(error);

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

const categoryKeywords = {

  Food: [
    "swiggy",
    "zomato",
    "dominos",
    "starbucks",
    "restaurant",
    "cafe",
    "blinkit",
    "bigbasket",
    "grocery",
  ],

  Travel: [
    "uber",
    "ola",
    "rapido",
    "irctc",
    "petrol",
    "flight",
    "metro",
  ],

  Shopping: [
    "amazon",
    "flipkart",
    "myntra",
    "ajio",
  ],

  Bills: [
    "electricity",
    "bill",
    "jio",
    "airtel",
    "wifi",
    "recharge",
  ],

  Entertainment: [
    "movie",
    "netflix",
    "spotify",
    "youtube",
    "prime",
  ],

};

const categorizeTransaction = (
  title
) => {

  const lowerTitle =
    title.toLowerCase();

  for (

    const [category, keywords]

    of Object.entries(
      categoryKeywords
    )

  ) {

    if (

      keywords.some(
        (keyword) =>

          lowerTitle.includes(
            keyword
          )

      )

    ) {

      return category;

    }

  }

  return "Other";

}; 

const handlePDFUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    const text = await extractPDFText(file);

    const transactions = parseStatement(text);

    setPdfTransactions(transactions);

    setShowPDFPreview(true);

    e.target.value = "";
  } catch (error) {
    console.error(error);

    alert("Failed to read PDF.");
  }
};

const handleImportPDF = async () => {
  try {
    setImportingPDF(true);

    const result = await importTransactions({
      transactions: pdfTransactions,
      user,
      fetchExpenses,
    });

    setShowPDFPreview(false);
    setPdfTransactions([]);

    alert(
      `PDF imported successfully!\n\n` +
      `Imported: ${result.importedCount}\n` +
      `Duplicates: ${result.duplicateCount}`
    );

  } catch (error) {
    console.error(error);

    alert(error.message);

  } finally {
    setImportingPDF(false);
  }
};

const handleCSVUpload = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,

    complete: (results) => {
      if (!results.data.length) return;

      setCsvData(results.data);
      setCsvHeaders(Object.keys(results.data[0]));
      setShowMappingModal(true);
    },

    error: (err) => {
      console.error(err);
      alert("Unable to read CSV file.");
    },
  });
};

const convertDate = (dateString) => {
  if (!dateString) return "";

  // DD-MM-YYYY
  if (dateString.includes("-")) {
    const [day, month, year] = dateString.split("-");

    return `${year}-${month}-${day}`;
  }

  // DD/MM/YYYY
  if (dateString.includes("/")) {
    const [day, month, year] = dateString.split("/");

    return `${year}-${month}-${day}`;
  }

  return dateString;
};

const handleImport = async () => {

  // Close the modal immediately
  // setShowMappingModal(false);

  // Show importing state
  setImportingCSV(true);

  try {

    let importedCount = 0;
    let duplicateCount = 0;

    for (const row of csvData) {

      const rawDate = row[columnMapping.date];
      const title = row[columnMapping.title]?.trim() || "";
      
      const lowerTitle = title.toLowerCase();
      
      if (
        lowerTitle.startsWith("received from") ||
        lowerTitle.includes("received")
      ) {
        continue;
      }
      
      const amount = row[columnMapping.amount];

      if (!rawDate || !title || !amount) continue;

      let category = await getMerchantCategory(
        user.id,
        title
      );

      if (!category) {
        category = categorizeTransaction(title);
      }

      const formattedDate = convertDate(rawDate);

      try {

        await addExpense({
          title,
          amount,
          date: formattedDate,
          category,
          user_id: user.id,
        });

        importedCount++;

      } catch (error) {

        if (
          error.message &&
          error.message.includes("unique_expense")
        ) {

          duplicateCount++;

        } else {

          throw error;

        }
      }
    }

    await fetchExpenses();
    setShowMappingModal(false);

    alert(
      `${importedCount} expenses imported.\n${duplicateCount} duplicates skipped.`
    );

  } catch (error) {

    console.error(error);

    alert("Error importing CSV:\n" + error.message);

  } finally {

    setImportingCSV(false);

  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case "Food":
      return (
        <Utensils
          size={22}
          className="text-orange-500"
        />
      );

    case "Shopping":
      return (
        <ShoppingBag
          size={22}
          className="text-pink-500"
        />
      );

    case "Bills":
      return (
        <Bolt
          size={22}
          className="text-yellow-500"
        />
      );

    case "Fuel":
      return (
        <Fuel
          size={22}
          className="text-red-500"
        />
      );

    case "Education":
      return (
        <GraduationCap
          size={22}
          className="text-indigo-500"
        />
      );

    case "Travel":
      return (
        <Car
          size={22}
          className="text-blue-500"
        />
      );

    case "Entertainment":
      return (
        <Film
          size={22}
          className="text-purple-500"
        />
      );

    case "Medical":
      return (
        <Stethoscope
          size={22}
          className="text-green-500"
        />
      );

    case "Others":
      return (
        <Receipt
          size={22}
          className="text-gray-500"
        />
      );

    default:
      return (
        <Receipt
          size={22}
          className="text-gray-500"
        />
      );
  }
};

  return (

    <div className="min-h-screen bg-background text-foreground">

      {/* NAVBAR */}
      
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4 md:px-10">
      
        <div className="flex items-center gap-3">
      
          <img
            src={logo}
            alt="logo"
            className="h-12 md:h-14"
          />
      
          <div>
        
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Lekhankan
            </h1>
        
            <p className="text-sm text-muted-foreground">
        
              Welcome back,
              {" "}
        
              {
                user.user_metadata?.full_name ||
                user.email
              }
        
            </p>
        
          </div>
      
        </div>
      
        <div className="flex items-center gap-3 md:gap-4">
      
          <ThemeToggle />

          <button
            onClick={() => setShowAddExpense(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover md:px-5 md:py-3"
          >
      
            <PlusCircle size={18} />
      
            <span className="hidden sm:inline">Add Expense</span>
      
          </button>

          <div className="flex gap-3">

            {/* CSV Upload */}
            <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-primary-foreground transition hover:bg-primary-hover">
          
              <Upload size={18} />
          
              <span className="hidden sm:inline">
                Upload CSV
              </span>
          
              <input
                type="file"
                accept=".csv"
                onChange={(e) => {
                  handleCSVUpload(e);
                  e.target.value = "";
                }}
                className="hidden"
              />
          
            </label>
          
            {/* PDF Upload */}
            <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-primary-foreground transition hover:bg-primary-hover">
          
              <Upload size={18} />
          
              <span className="hidden sm:inline">
                Upload PDF
              </span>
          
              <input
                type="file"
                accept=".pdf"
                onChange={handlePDFUpload}
                className="hidden"
              />
          
            </label>
          
          </div>
      
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
      
            <LogOut size={18} />
      
            <span className="hidden sm:inline">Logout</span>
      
          </button>
      
        </div>
      
      </div>

      <div className="px-6 py-8 md:px-10 md:py-10">
        
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* TOTAL EXPENSES */}
        
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
        
            <div className="mb-6 flex items-start justify-between">
        
              <p className="text-muted-foreground">
                Total Expenses
              </p>
        
              <IndianRupeeIcon className="text-primary" />
        
            </div>
        
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              ₹{totalExpenses.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
        
            <p className="text-sm text-muted-foreground">
              All time
            </p>
        
          </div>
        
          {/* TRANSACTIONS */}
        
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
        
            <div className="mb-6 flex items-start justify-between">
        
              <p className="text-muted-foreground">
                Total Transactions
              </p>
        
              <TrendingUp className="text-primary" />
        
            </div>
        
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              {filteredExpenses.length}
            </h2>
        
            <p className="text-sm text-muted-foreground">
              All time
            </p>
        
          </div>
        
          {/* CATEGORY */}
        
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
        
            <div className="mb-6 flex items-start justify-between">
        
              <p className="text-muted-foreground">
                Categories
              </p>
        
              <CreditCard className="text-primary" />
        
            </div>
        
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
        
              {[...new Set(filteredExpenses.map((e) => e.category))].length}
        
            </h2>
        
            <p className="text-sm text-muted-foreground">
              Active categories
            </p>
        
          </div>
        
        </div>

      {/* ANALYTICS */}
      <div className="mb-10 rounded-xl border border-border bg-card p-6 shadow-card">

      <div className="mb-6">
      
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Analytics Overview
        </h2>
      
        <p className="mt-1 text-sm text-muted-foreground">
      
          Visual insights of your spending patterns
      
        </p>
      
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">

      <div className="rounded-xl border border-border bg-card p-6 md:p-8">
      
        <h2 className="mb-8 text-xl font-semibold">
      
          Spending Analytics
      
        </h2>
      
        <div className="h-[400px] w-full">
      
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
                        chartColors[index % chartColors.length]
                      }
                    />
      
                  ))
      
                }
      
              </Pie>
      
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-foreground)",
                  borderRadius: "0.5rem",
                }}
              />
      
              <Legend />
      
            </PieChart>
      
          </ResponsiveContainer>
      
        </div>
      
      </div>

      {/* MONTHLY BAR CHART */}

      <div className="rounded-xl border border-border bg-card p-6 md:p-8">
      
        <h2 className="mb-8 text-xl font-semibold">
      
          Monthly Spending
      
        </h2>
      
        <div className="h-[400px] w-full">
      
          <ResponsiveContainer>
      
            <BarChart
              data={monthlyData}
            >
      
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartStyles.grid}
              />
      
              <XAxis
                dataKey="month"
                stroke={chartStyles.axis}
                tick={{ fill: chartStyles.axis }}
              />
      
              <YAxis
                stroke={chartStyles.axis}
                tick={{ fill: chartStyles.axis }}
              />
      
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-foreground)",
                  borderRadius: "0.5rem",
                }}
              />
      
              <Bar
                dataKey="amount"
                fill={chartStyles.primary}
                radius={[8, 8, 0, 0]}
              />
      
            </BarChart>
      
          </ResponsiveContainer>
      
        </div>
      
      </div>

      </div>

      </div>

      {/* EXPENSE TRACK */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">

      <div className="mb-6">
      
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Expenses
        </h2>
      
        <p className="mt-1 text-sm text-muted-foreground">
      
          Manage and track your daily transactions
      
        </p>
      
      </div>

      {/* FILTERS */}
      
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 md:p-6 lg:flex-row lg:items-center">
      
        {/* SEARCH BAR */}
      
        <div className="relative flex-1">
      
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
      
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full rounded-lg border border-input py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-ring"
          />
      
        </div>
      
        {/* FILTER ICON */}
      
        <div className="hidden items-center justify-center lg:flex">
      
          <Filter
            size={22}
            className="text-muted-foreground"
          />
      
        </div>
      
        {/* CATEGORY FILTER */}
      
        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value)
          }
          className="min-w-[200px] rounded-lg border border-input px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="All">
            All Categories
          </option>
        
          <option value="Food">
            Food
          </option>
        
          <option value="Shopping">
            Shopping
          </option>
        
          <option value="Bills">
            Bills
          </option>
        
          <option value="Fuel">
            Fuel
          </option>
        
          <option value="Education">
            Education
          </option>
        
          <option value="Travel">
            Travel
          </option>
        
          <option value="Entertainment">
            Entertainment
          </option>
        
          <option value="Medical">
            Medical
          </option>
        
          <option value="Others">
            Others
          </option>
        </select>
      
        {/* TIME FILTER */}
      
        <select
          value={timeFilter}
          onChange={(e) =>
            setTimeFilter(e.target.value)
          }
          className="min-w-[180px] rounded-lg border border-input px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
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

            <div className="rounded-xl border border-dashed border-border bg-muted/30 p-16 text-center">

              <div className="mb-5 flex justify-center">
            
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl text-primary-foreground">
                  ₹
                </div>
            
              </div>
            
              <h2 className="mb-2 text-2xl font-bold">
                No Expenses Found
              </h2>
            
              <p className="mb-6 text-muted-foreground">
                Start tracking your spending by adding your first expense.
              </p>
            
              <button
                onClick={() => setShowAddExpense(true)}
                className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Add Expense
              </button>
            
            </div>

          ) : (

            filteredExpenses
              .slice(0, visibleExpenses)
              .map((expense) => (

              <div
                key={expense.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-6 py-5 transition-shadow hover:shadow-soft"
              >
              
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
              
                  {/* ICON BOX */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
              
                    {getCategoryIcon(expense.category)}
              
                  </div>
              
                  {/* DETAILS */}
                  <div>
              
                    <h3 className="text-lg font-semibold md:text-xl">
              
                      {expense.title}
              
                    </h3>
              
                    <div className="mt-1 flex flex-wrap items-center gap-3">
              
                      <p className="text-sm text-muted-foreground">
              
                        {expense.date}
              
                      </p>
              
                      <span className="text-border">
              
                        •
              
                      </span>
              
                      <p className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              
                        {expense.category}
              
                      </p>
              
                    </div>
              
                  </div>
              
                </div>
              
                {/* RIGHT SIDE */}
                <div className="flex items-center gap-5">
              
                  {/* AMOUNT */}
                  <p className="text-xl font-bold text-primary md:text-2xl">
              
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
                      className="rounded-lg p-2 transition-colors hover:bg-secondary"
                    >
              
                      <Pencil
                        size={18}
                        className="text-muted-foreground"
                      />
              
                    </button>
              
                    {/* DELETE */}
                    <button
                      onClick={() => {

                        setExpenseToDelete(expense.id);
                      
                        setShowDeleteModal(true);
                      
                      }}
                      className="rounded-lg p-2 transition-colors hover:bg-destructive/10"
                    >
              
                      <Trash2
                        size={18}
                        className="text-destructive"
                      />
              
                    </button>
              
                  </div>
              
                </div>
              
              </div>

            ))

          )

        }

      </div>
      {
        visibleExpenses < filteredExpenses.length && (
      
          <div className="flex justify-center mt-6">
      
            <button
              onClick={() =>
                setVisibleExpenses(
                  prev => prev + 6
                )
              }
              className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
      
              Load More
      
            </button>
      
          </div>
      
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
      
      {
        showMappingModal && (
          <ColumnMappingModal
            csvHeaders={csvHeaders}
            columnMapping={columnMapping}
            setColumnMapping={setColumnMapping}
            handleImport={handleImport}
            setShowMappingModal={setShowMappingModal}
            importingCSV={importingCSV}
          />
        )
      }

      {
        showPDFPreview && (
          <PDFPreviewModal
            transactions={pdfTransactions}
            importing={importingPDF}
            onCancel={() => {
              setShowPDFPreview(false);
              setPdfTransactions([]);
            }}
            onImport={handleImportPDF}
          />
        )
      }
      

    </div>

  );

}

export default Dashboard;