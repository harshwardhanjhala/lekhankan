function DeleteConfirmationModal({

  setShowDeleteModal,
  handleConfirmDelete,

}) {

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-blur-sm">

      <div className="w-[90%] max-w-md rounded-xl border border-border bg-card p-8 shadow-lg">

        <h2 className="mb-3 text-2xl font-bold">

          Delete Expense

        </h2>

        <p className="mb-8 text-muted-foreground">

          Are you sure you want to delete this expense?
          This action cannot be undone.

        </p>

        <div className="flex justify-end gap-4">

          {/* CANCEL */}
          <button
            onClick={() =>
              setShowDeleteModal(false)
            }
            className="rounded-lg border border-border px-5 py-2 transition-colors hover:bg-secondary"
          >

            Cancel

          </button>

          {/* DELETE */}
          <button
            onClick={handleConfirmDelete}
            className="rounded-lg bg-destructive px-5 py-2 text-white transition-colors hover:bg-destructive-hover"
          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteConfirmationModal;
