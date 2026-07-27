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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-blur-sm">

      <div className="relative w-[420px] rounded-xl border border-border bg-card p-8 shadow-lg">

        {/* Close Button */}
        <button
          onClick={() => setShowAddExpense(false)}
          className="absolute right-5 top-4 text-2xl text-muted-foreground transition-colors hover:text-foreground"
        >
          ×
        </button>

        {/* Heading */}
        <h1 className="mb-2 text-2xl font-bold">
          {
            editingExpense
              ? "Edit Expense"
              : "Add Expense"
          }
        </h1>

        <p className="mb-6 text-muted-foreground">
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
            className="w-full rounded-lg border border-input p-3 outline-none focus:ring-2 focus:ring-ring"
          />

          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-input p-3 outline-none focus:ring-2 focus:ring-ring"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full rounded-lg border border-input p-3 outline-none focus:ring-2 focus:ring-ring"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-input p-3 outline-none focus:ring-2 focus:ring-ring"
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
            className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-50"
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
