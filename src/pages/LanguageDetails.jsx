import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getLanguage,languages } from '../data/languages';
import { examples } from '../data/examples';
import CodeBlock from '../components/CodeBlock';
import { updateProgress } from '../utils/storage';

export default function LanguageDetails(){
 const {slug}=useParams();
 const language=getLanguage(slug);
 useEffect(()=>{
  if(!slug)return;
  updateProgress(progress=>({...progress,visitedLanguages:[...new Set([...(progress.visitedLanguages||[]),slug])]}));
 },[slug]);
 if(!language) return <main className="page container"><h1>Language not found</h1><Link to="/languages">Browse languages</Link></main>;
 const index=languages.findIndex(l=>l.slug===slug);
 const prev=languages[(index-1+languages.length)%languages.length], next=languages[(index+1)%languages.length];
 return <main className="language-page"><div className="container">
  <header className="language-hero"><div><Link className="back-link" to="/languages"><ArrowLeft size={16}/> All languages</Link><span className="section-kicker">{language.difficulty} level</span><h1>{language.name}</h1><p>{language.description}</p></div><Link className="button primary" to={`/exams/${language.slug}`}>Take {language.name} exam</Link></header>
  <div className="learning-layout"><aside className="topic-sidebar"><b>Learning topics</b>{language.topics.map((topic,i)=><a href={`#example-${i+1}`} key={topic}><span>{String(i+1).padStart(2,"0")}</span>{topic}</a>)}</aside>
   <div className="examples-column">{examples[slug].map(example=><CodeBlock key={example.number} example={example} language={language}/>)}</div>
  </div>
  <nav className="topic-navigation"><Link to={`/languages/${prev.slug}`}><span>Previous language</span><b>{prev.name}</b></Link><Link to={`/languages/${next.slug}`}><span>Next language</span><b>{next.name} <ArrowRight size={16}/></b></Link></nav>
 </div></main>
}
