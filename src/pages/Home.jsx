import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Layers3, Award } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import LanguageCard from '../components/LanguageCard';
import TutorialCard from '../components/TutorialCard';
import { languages } from '../data/languages';
import { tutorials } from '../data/tutorials';

export default function Home(){
 return <>
  <section className="hero"><div className="container hero-grid">
   <div><div className="eyebrow"><span/>Programming, made practical</div><h1>Master Every<br/>Programming Language.</h1><p>Explore programming languages, learn with practical examples, improve your coding skills, and test your knowledge with UDIT.</p><div className="hero-actions"><Link className="button primary" to="/languages">Explore Languages <ArrowRight size={17}/></Link><Link className="button secondary" to="/tutorials">Start Learning</Link></div></div>
   <div className="hero-code"><div className="editor-bar"><span/><span/><span/><b>udit-platform.js</b></div><pre><code><span className="code-keyword">const</span> learner = {"{"}<br/>  name: <span className="code-string">"You"</span>,<br/>  goal: <span className="code-string">"Master code"</span>,<br/>{"}"};<br/><br/>learner.<span className="code-keyword">learn</span>();</code></pre><div className="code-output"><b>UDIT</b><span>Ready to build</span></div></div>
  </div><div className="container hero-search"><SearchBar/></div></section>
  <section className="stats-strip"><div className="container stats"><div><b>20</b><span>Programming Languages</span></div><div><b>200</b><span>Code Examples</span></div><div><b>200</b><span>Exam Questions</span></div></div></section>
  <section className="section"><div className="container"><div className="section-heading"><div><span className="section-kicker">Explore</span><h2>Featured programming languages</h2></div><Link className="text-link" to="/languages">View all languages <ArrowRight size={16}/></Link></div><div className="language-grid">{languages.slice(0,8).map(language=><LanguageCard key={language.slug} language={language}/>)}</div></div></section>
  <section className="section light"><div className="container"><div className="section-heading"><div><span className="section-kicker">Learn</span><h2>Popular tutorials</h2></div><Link className="text-link" to="/tutorials">Browse tutorials <ArrowRight size={16}/></Link></div><div className="tutorial-grid">{tutorials.slice(0,6).map(tutorial=><TutorialCard key={tutorial.slug} tutorial={tutorial}/>)}</div></div></section>
  <section className="section"><div className="container path-grid"><article><div className="path-icon"><Code2/></div><span>Practice</span><h2>Build confidence with focused coding questions.</h2><p>Choose a language, topic, and difficulty. Then reveal a clear solution and explanation when you are ready.</p><Link className="button primary" to="/practice">Start practicing</Link></article><article><div className="path-icon"><Award/></div><span>Exams</span><h2>Test what you know with 20 individual exams.</h2><p>Complete 10 questions in each language, receive instant results, and review every answer.</p><Link className="button primary" to="/exams">Browse exams</Link></article></div></section>
 </>
}
