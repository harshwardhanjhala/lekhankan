function ColumnMappingModal({
  csvHeaders,
  columnMapping,
  setColumnMapping,
  handleImport,
  setShowMappingModal,
  importingCSV,   
}) {
  if (importingCSV) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-blur-sm">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center">
  
          {/* Spinner */}
          <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
  
          <h2 className="text-2xl font-bold">
            Importing Transactions
          </h2>
  
          <p className="mt-3 text-muted-foreground">
            Please wait while we import your CSV.
          </p>
  
          <p className="mt-2 text-sm text-muted-foreground">
            This may take a few seconds...
          </p>
  
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-blur-sm">

      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Map CSV Columns
        </h2>

        {/* DATE */}
        <div className="mb-4">
          <label className="mb-2 block font-medium">
            Date Column
          </label>

          <select
            value={columnMapping.date}
            onChange={(e) =>
              setColumnMapping({
                ...columnMapping,
                date: e.target.value,
              })
            }
            className="w-full rounded-lg border border-input p-3 outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">
              Select Date Column
            </option>

            {csvHeaders.map((header) => (
              <option
                key={header}
                value={header}
              >
                {header}
              </option>
            ))}
          </select>
        </div>

        {/* TITLE */}
        <div className="mb-4">
          <label className="mb-2 block font-medium">
            Title Column
          </label>

          <select
            value={columnMapping.title}
            onChange={(e) =>
              setColumnMapping({
                ...columnMapping,
                title: e.target.value,
              })
            }
            className="w-full rounded-lg border border-input p-3 outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">
              Select Title Column
            </option>

            {csvHeaders.map((header) => (
              <option
                key={header}
                value={header}
              >
                {header}
              </option>
            ))}
          </select>
        </div>

        {/* AMOUNT */}
        <div className="mb-6">
          <label className="mb-2 block font-medium">
            Amount Column
          </label>

          <select
            value={columnMapping.amount}
            onChange={(e) =>
              setColumnMapping({
                ...columnMapping,
                amount: e.target.value,
              })
            }
            className="w-full rounded-lg border border-input p-3 outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">
              Select Amount Column
            </option>

            {csvHeaders.map((header) => (
              <option
                key={header}
                value={header}
              >
                {header}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={() =>
              setShowMappingModal(false)
            }
            className="rounded-lg border border-border px-4 py-2 transition-colors hover:bg-secondary"
          >
            Cancel
          </button>

          <button
            onClick={handleImport}
            disabled={importingCSV}
            className="rounded-lg bg-primary px-5 py-2 text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {importingCSV ? "Importing..." : "Import"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ColumnMappingModal;
