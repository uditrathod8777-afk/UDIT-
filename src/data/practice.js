import { languages } from './languages.js';

export const practiceByLanguage = Object.fromEntries(languages.map(language=>[
  language.slug,
  [
    {id:`${language.slug}-basics`,title:`${language.name} Basics`,topic:"Variables",difficulty:"Beginner",prompt:`Create a named value in ${language.name} that stores "UDIT" and print or display it.`,starter:`// Store "UDIT" in a variable\n// Display the variable`,hint:"Choose a variable name, assign the text value, then use the language's standard output command.",solution:"Store the text in a variable, then use the language's standard output command.",explanation:"Named values make programs easier to read and update."},
    {id:`${language.slug}-condition`,title:`Control a ${language.name} Condition`,topic:"Conditions",difficulty:"Intermediate",prompt:`Given a score of 75, print "Pass" when it is at least 60 and "Try again" otherwise.`,starter:`const score = 75;\n// Add your condition here`,hint:"Compare score >= 60 in an if statement or conditional expression.",solution:"Create a conditional that compares the score to 60 and select the first branch when the condition is true.",explanation:"An if/else branch maps a Boolean condition to an outcome."},
    {id:`${language.slug}-collections`,title:`Process ${language.name} Collections`,topic:"Arrays or Collections",difficulty:"Advanced",prompt:`Store three language names, process each item once, and calculate the collection size.`,starter:`// Create a collection\n// Loop through it\n// Print its size`,hint:"Create an array or list, iterate over it, and use a length or count operation.",solution:"Create a collection, iterate over it, and use the language's collection length property or function.",explanation:"Collection iteration and size operations are common practical data patterns."}
  ]
]));
