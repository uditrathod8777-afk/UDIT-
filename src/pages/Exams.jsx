import { Link } from 'react-router-dom';
import { languages } from '../data/languages';
import { ArrowRight } from 'lucide-react';

export default function Exams(){
 return <main className="page"><div className="container"><header className="page-header"><span className="section-kicker">Knowledge check</span><h1>Individual language exams</h1><p>Every exam contains 10 questions. A score of 6 or more is a pass.</p></header><div className="exam-grid">{languages.map(language=><article className="exam-card" key={language.slug}><span className="language-initial">{language.name.slice(0,1)}</span><div><h2>{language.name} Exam</h2><p>10 questions · 6 to pass</p></div><Link to={`/exams/${language.slug}`} aria-label={`Start ${language.name} exam`}><ArrowRight size={18}/></Link></article>)}</div></div></main>
}
