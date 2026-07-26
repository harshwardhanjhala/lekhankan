function AddExpenseModal({
  setShowAddExpense,
  title,
  setTitle,
  amount,
  setAmount,
  category,
  setCategory,
  date,
  setDate,
  handleAddExpense,
  loading,
  editingExpense,
  handleEditExpense,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-[420px] p-8 rounded-3xl relative border border-pink-100 shadow-2xl">

        {/* Close Button */}
        <button
          onClick={() => setShowAddExpense(false)}
          className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-pink-500"
        >
          ×
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#5B2C83] to-[#FF5FA2] bg-clip-text text-transparent">
          {
            editingExpense
              ? "Edit Expense"
              : "Add Expense"
          }
        </h1>

        <p className="text-gray-500 mb-6">
          {
            editingExpense
              ? "Update your expense details"
              : "Track your spending smartly"
          }
        </p>

        {/* Form */}
        <form
          onSubmit={handleAddExpense}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
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
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#5B2C83] to-[#FF5FA2] hover:opacity-90 transition-all"
          >
            {
              loading
                ? (
                    editingExpense
                      ? "Updating..."
                      : "Adding..."
                  )
                : (
                    editingExpense
                      ? "Update Expense"
                      : "Add Expense"
                  )
            }
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddExpenseModal;