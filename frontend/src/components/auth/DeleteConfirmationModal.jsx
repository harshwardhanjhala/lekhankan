function DeleteConfirmationModal({

  setShowDeleteModal,
  handleConfirmDelete,

}) {

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[90%] max-w-md shadow-2xl">

        <h2 className="text-2xl font-bold text-gray-800 mb-3">

          Delete Expense

        </h2>

        <p className="text-gray-500 mb-8">

          Are you sure you want to delete this expense?
          This action cannot be undone.

        </p>

        <div className="flex justify-end gap-4">

          {/* CANCEL */}
          <button
            onClick={() =>
              setShowDeleteModal(false)
            }
            className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all"
          >

            Cancel

          </button>

          {/* DELETE */}
          <button
            onClick={handleConfirmDelete}
            className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all"
          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteConfirmationModal;