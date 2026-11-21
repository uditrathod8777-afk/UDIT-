export const dailyChallenges = [
  {
    title: "Sum of Two Numbers",
    difficulty: "Beginner",
    description: "Write a function that accepts two integers and returns their sum.",
    input: "4 6",
    output: "10",
    hints: ["Add the two values directly.", "The result should be an integer."],
    solution: "function sum(a, b) {\n  return a + b;\n}",
    points: 10
  },
  {
    title: "Find the Largest Value",
    difficulty: "Beginner",
    description: "Given an array of numbers, return the largest value.",
    input: "[12, 48, 7, 31]",
    output: "48",
    hints: ["Start with the first item.", "Compare each remaining item."],
    solution: "function largest(values) {\n  return Math.max(...values);\n}",
    points: 10
  },
  {
    title: "Remove Duplicate Values",
    difficulty: "Intermediate",
    description: "Return a new array containing each value only once.",
    input: "[1, 2, 2, 3, 1]",
    output: "[1, 2, 3]",
    hints: ["A Set preserves unique values.", "Arrays can be converted from a Set."],
    solution: "function unique(values) {\n  return [...new Set(values)];\n}",
    points: 20
  },
  {
    title: "Balanced Parentheses",
    difficulty: "Intermediate",
    description: "Determine whether every opening parenthesis has a matching closing parenthesis in the correct order.",
    input: "(learn(code))",
    output: "true",
    hints: ["Use a counter.", "The counter must never go below zero."],
    solution: "function balanced(text) {\n  let count = 0;\n  for (const char of text) {\n    if (char === '(') count++;\n    if (char === ')') count--;\n    if (count < 0) return false;\n  }\n  return count === 0;\n}",
    points: 20
  },
  {
    title: "Longest Word",
    difficulty: "Advanced",
    description: "Given a sentence, return the longest word and preserve the first one when lengths are tied.",
    input: "Build clear maintainable code",
    output: "maintainable",
    hints: ["Split the sentence.", "Track the word and its length."],
    solution: "function longest(sentence) {\n  return sentence.split(' ').reduce((best, word) =>\n    word.length > best.length ? word : best, '');\n}",
    points: 30
  },
  {
    title: "Fibonacci Sequence",
    difficulty: "Advanced",
    description: "Return an array containing the Fibonacci sequence through the given count.",
    input: "7",
    output: "[0, 1, 1, 2, 3, 5, 8]",
    hints: ["Start with 0 and 1.", "Each value is the sum of the previous two."],
    solution: "function fibonacci(count) {\n  const values = [0, 1];\n  for (let i = 2; i < count; i++) {\n    values.push(values[i - 1] + values[i - 2]);\n  }\n  return values.slice(0, count);\n}",
    points: 30
  }
];

export function getDailyChallenge(date = new Date()) {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const seed = [...key].reduce((total, character) => total + character.charCodeAt(0), 0);
  return { date: key, challenge: dailyChallenges[seed % dailyChallenges.length], index: seed % dailyChallenges.length };
}
