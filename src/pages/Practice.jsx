import { useState } from 'react';
import { languages } from '../data/languages';
import { practiceByLanguage } from '../data/practice';
import PracticeQuestion from '../components/PracticeQuestion';

export default function Practice(){
 const [language,setLanguage]=useState("python");
 const [topic,setTopic]=useState("All");
 const [difficulty,setDifficulty]=useState("All");
 const [search,setSearch]=useState("");
 const questions=practiceByLanguage[language].filter(q=>(topic==="All"||q.topic===topic)&&(difficulty==="All"||q.difficulty===difficulty)&&`${q.title} ${q.topic} ${q.prompt}`.toLowerCase().includes(search.toLowerCase()));
 const topics=["All",...new Set(practiceByLanguage[language].map(q=>q.topic))];
 return <main className="page"><div className="container">
  <header className="page-header"><span className="section-kicker">Coding practice</span><h1>Practice by language and level</h1><p>Choose a challenge, think through the solution, then reveal the answer.</p></header>
  <div className="practice-controls"><label>Language<select value={language} onChange={e=>{setLanguage(e.target.value);setTopic("All")}}>{languages.map(l=><option key={l.slug} value={l.slug}>{l.name}</option>)}</select></label><label>Topic<select value={topic} onChange={e=>setTopic(e.target.value)}>{topics.map(t=><option key={t}>{t}</option>)}</select></label><label>Difficulty<select value={difficulty} onChange={e=>setDifficulty(e.target.value)}>{["All","Beginner","Intermediate","Advanced"].map(d=><option key={d}>{d}</option>)}</select></label><label>Search<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search questions"/></label></div>
  {questions.length?<div className="practice-list">{questions.map((q,i)=><PracticeQuestion key={q.title} question={q} index={i}/>)}</div>:<div className="empty-state"><h2>No practice questions match</h2><p>Choose another topic or difficulty.</p></div>}
 </div></main>
}
