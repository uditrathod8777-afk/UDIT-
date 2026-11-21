import { languages } from './languages.js';

export const tutorials = languages.map((language,index)=>({
  slug:`${language.slug}-essentials`,
  language:language.name,
  title:`${language.name} Essentials`,
  level:index % 3===0?"Beginner":index % 3===1?"Intermediate":"Advanced",
  description:`Learn the core syntax, data model, and practical workflow for ${language.name}.`,
  sections:["Setup and Environment","Core Syntax","Practical Example","Next Steps"],
  code:index===5?"<h1>Learn ${language.name}</h1>":index===6? ".card { border: 1px solid #e5e7eb; }":`// ${language.name} practical example\nprint("Build, test, and improve")`
}));
