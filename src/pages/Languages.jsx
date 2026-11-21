import { useState } from 'react';
import LanguageCard from '../components/LanguageCard';
import { languages } from '../data/languages';

export default function Languages(){
 const [filter,setFilter]=useState("All");
 const levels=["All","Beginner","Intermediate","Advanced"];
 const visible=languages.filter(l=>filter==="All"||l.difficulty===filter);
 return <main className="page"><div className="container">
  <header className="page-header"><span className="section-kicker">Language library</span><h1>Explore 20 programming languages</h1><p>Find the right language for your goals and learn through complete examples.</p></header>
  <div className="filter-bar">{levels.map(level=><button key={level} className={filter===level?"active":""} onClick={()=>setFilter(level)}>{level}</button>)}</div>
  <div className="language-grid">{visible.map(language=><LanguageCard key={language.slug} language={language}/>)}</div>
 </div></main>
}
