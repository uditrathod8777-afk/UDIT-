import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { languages } from '../data/languages';
import { tutorials } from '../data/tutorials';
import { examples } from '../data/examples';
import { practiceByLanguage } from '../data/practice';
import { dailyChallenges } from '../data/dailyChallenges';

export default function SearchPage(){
 const [params]=useSearchParams(),query=(params.get("q")||"").trim().toLowerCase();
 const results=[];
 if(query){
  languages.forEach(l=>{if(`${l.name} ${l.description} ${l.topics.join(" ")}`.toLowerCase().includes(query))results.push({title:l.name,type:"Programming language",to:`/languages/${l.slug}`})});
  tutorials.forEach(t=>{if(`${t.title} ${t.description} ${t.language}`.toLowerCase().includes(query))results.push({title:t.title,type:"Tutorial",to:`/tutorials/${t.slug}`})});
  languages.forEach(l=>examples[l.slug].forEach((e,i)=>{if(`${e.title} ${e.code} ${e.explanation}`.toLowerCase().includes(query))results.push({title:`${l.name}: ${e.title}`,type:"Code example",to:`/languages/${l.slug}#example-${i+1}`})}));
  languages.forEach(l=>practiceByLanguage[l.slug].forEach(p=>{if(`${p.title} ${p.topic} ${p.prompt}`.toLowerCase().includes(query))results.push({title:`${l.name}: ${p.title}`,type:"Practice question",to:"/practice"})}));
  dailyChallenges.forEach(challenge=>{if(`${challenge.title} ${challenge.description} ${challenge.difficulty}`.toLowerCase().includes(query))results.push({title:challenge.title,type:"Coding challenge",to:"/challenge"})});
 }
 return <main className="page"><div className="container"><header className="search-page-header"><span className="section-kicker">Search UDIT</span><h1>Find exactly what you need</h1><SearchBar/></header>{!query?<div className="empty-state"><Search/><h2>Start a search</h2><p>Search by language, tutorial, topic, code example, or practice question.</p></div>:results.length?<><p className="result-count">{results.length} result{results.length===1?"":"s"} for "{params.get("q")}"</p><div className="search-results">{results.slice(0,40).map((r,i)=><Link key={i} to={r.to}><span>{r.type}</span><b>{r.title}</b><em>Open →</em></Link>)}</div></>:<div className="empty-state"><h2>No results found</h2><p>Try a broader term or check the spelling.</p></div>}</div></main>
}
