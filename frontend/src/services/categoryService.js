const categoryRules = [
  {
    category: "Food",
    keywords: [
      "zomato",
      "swiggy",
      "restaurant",
      "cafe",
      "cakes",
      "food",
      "pizza",
      "dominos",
      "mcdonald",
      "kfc",
      "chai",
    ],
  },

  {
    category: "Shopping",
    keywords: [
      "amazon",
      "flipkart",
      "zepto",
      "garments",
      "mart",
      "ekart",
      "shopping",
    ],
  },

  {
    category: "Bills",
    keywords: [
      "vi prepaid",
      "airtel",
      "jio",
      "recharge",
      "electricity",
      "water bill",
      "gas",
      "internet",
      "broadband",
    ],
  },

  {
    category: "Fuel",
    keywords: [
      "petrol",
      "fuel",
      "petroleum",
      "petro point",
      "hpcl",
      "bpcl",
      "indian oil",
    ],
  },

  {
    category: "Education",
    keywords: [
      "school",
      "college",
      "university",
      "education",
      "tuition",
      "course",
      "stationery",
    ],
  },

  {
    category: "Travel",
    keywords: [
      "railway",
      "irctc",
      "uber",
      "ola",
      "rapido",
      "flight",
      "airlines",
      "ropeway",
    ],
  },

  {
    category: "Entertainment",
    keywords: [
      "movie",
      "cinema",
      "netflix",
      "pvr",
      "inox",
      "game",
      "games",
      "bookmyshow",
    ],
  },

  {
    category: "Medical",
    keywords: [
      "medical",
      "pharmacy",
      "hospital",
      "clinic",
      "medicine",
      "chemist",
    ],
  },
];

export const categorizeTransaction = (title) => {

  const text = title.toLowerCase();

  for (const rule of categoryRules) {
    const matched = rule.keywords.some((keyword) =>
      text.includes(keyword)
    );

    if (matched) {
      return rule.category;
    }
  }

  return "Others";
};