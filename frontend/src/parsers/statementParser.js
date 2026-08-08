export function parseStatement(text) {

  const transactions = [];

  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length);

  for (const line of lines) {

    // Ignore income
    if (line.includes("Received from")) {
      continue;
    }

    // Match only expense lines
    const match = line.match(
      /^(\d{2}\s[A-Za-z]{3},\s\d{4})\s+Paid to\s+(.+?)\s+₹([\d,]+(?:\.\d+)?)$/
    );

    if (!match) continue;

    transactions.push({
      date: match[1],
      title: match[2].trim(),
      amount: Number(
        match[3].replace(/,/g, "")
      ),
    });

  }

  return transactions;

}