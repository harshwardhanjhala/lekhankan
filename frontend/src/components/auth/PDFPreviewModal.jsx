function PDFPreviewModal({
  transactions,
  onImport,
  onCancel,
  importing,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-blur-sm">

      <div className="w-full max-w-5xl rounded-xl border border-border bg-card p-6">

        <h2 className="mb-5 text-2xl font-bold">
          PDF Import Preview
        </h2>

        <div className="max-h-[450px] overflow-y-auto rounded-lg border border-border">

          <table className="w-full">

            <thead className="sticky top-0 bg-card">

              <tr className="border-b">

                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Merchant</th>
                <th className="p-3 text-right">Amount</th>

              </tr>

            </thead>

            <tbody>

              {transactions.map((item, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="p-3">
                    {item.date}
                  </td>

                  <td className="p-3">
                    {item.title}
                  </td>

                  <td className="p-3 text-right">

                    ₹
                    {item.amount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-lg border border-border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onImport}
            disabled={importing}
            className="rounded-lg bg-primary px-5 py-2 text-primary-foreground"
          >
            {importing
              ? "Importing..."
              : `Import ${transactions.length} Expenses`}
          </button>

        </div>

      </div>

    </div>
  );
}

export default PDFPreviewModal;