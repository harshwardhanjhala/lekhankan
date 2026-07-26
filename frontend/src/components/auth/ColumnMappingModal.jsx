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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-3xl p-8 text-center">
  
          {/* Spinner */}
          <div className="w-12 h-12 mx-auto border-4 border-pink-300 border-t-[#4B1D83] rounded-full animate-spin mb-6"></div>
  
          <h2 className="text-2xl font-bold text-gray-800">
            Importing Transactions
          </h2>
  
          <p className="text-gray-500 mt-3">
            Please wait while we import your CSV.
          </p>
  
          <p className="text-sm text-gray-400 mt-2">
            This may take a few seconds...
          </p>
  
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Map CSV Columns
        </h2>

        {/* DATE */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
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
            className="w-full border rounded-xl p-3"
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
          <label className="block mb-2 font-medium">
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
            className="w-full border rounded-xl p-3"
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
          <label className="block mb-2 font-medium">
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
            className="w-full border rounded-xl p-3"
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
            className="px-4 py-2 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleImport}
            disabled={importingCSV}
            className="bg-gradient-to-r from-[#4B1D83] to-[#FF4F9A] text-white px-5 py-2 rounded-xl disabled:opacity-50"
          >
            {importingCSV ? "Importing..." : "Import"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ColumnMappingModal;