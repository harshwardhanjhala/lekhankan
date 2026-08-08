import { addExpense } from "./expenseService";
import { getMerchantCategory } from "./merchantService";
import { categorizeTransaction } from "./categoryService";

export async function importTransactions({
  transactions,
  user,
  fetchExpenses,
}) {

  let importedCount = 0;
  let duplicateCount = 0;

  for (const transaction of transactions) {

    const {
      title,
      amount,
      date,
    } = transaction;

    if (!title || !amount || !date) {
      continue;
    }

    let category =
      await getMerchantCategory(
        user.id,
        title
      );

    if (!category) {
      category =
        categorizeTransaction(title);
    }

    try {

      await addExpense({

        title,
        amount,
        date,
        category,
        user_id: user.id,

      });

      importedCount++;

    } catch (error) {

      if (
        error.message &&
        error.message.includes(
          "unique_expense"
        )
      ) {

        duplicateCount++;

      } else {

        throw error;

      }

    }

  }

  await fetchExpenses();

  return {
    importedCount,
    duplicateCount,
  };

}