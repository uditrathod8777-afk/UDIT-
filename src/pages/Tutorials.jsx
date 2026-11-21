import { Link, useParams } from 'react-router-dom';
import { tutorials } from '../data/tutorials';
import TutorialCard from '../components/TutorialCard';

export default function Tutorials(){
 const {slug}=useParams();
 if(slug){
  const tutorial=tutorials.find(t=>t.slug===slug);
  if(!tutorial) return <main className="page container"><h1>Tutorial not found</h1><Link to="/tutorials">All tutorials</Link></main>;
  const index=tutorials.findIndex(t=>t.slug===slug);
  const prev=tutorials[(index-1+tutorials.length)%tutorials.length],next=tutorials[(index+1)%tutorials.length];
  return <main className="page"><div className="container tutorial-detail"><Link className="back-link" to="/tutorials">← All tutorials</Link><span className="section-kicker">{tutorial.language} · {tutorial.level}</span><h1>{tutorial.title}</h1><p className="tutorial-lead">{tutorial.description}</p><aside className="tutorial-sections">{tutorial.sections.map((s,i)=><a href={`#section-${i}`} key={s}>{i+1}. {s}</a>)}</aside>{tutorial.sections.map((section,i)=><section id={`section-${i}`} className="tutorial-section" key={section}><span>0{i+1}</span><h2>{section}</h2>{i===0?<p>Set up the {tutorial.language} runtime or editor, create a source file, and run the example below.</p>:i===1?<p>Start with values, operations, and control flow. Keep code focused and readable as you learn the core syntax.</p>:i===2?<p>Use this practical pattern, then modify it to solve a small problem of your own.</p>:<p>Continue with the dedicated {tutorial.language} learning page and complete its 10 examples and exam.</p>}{i===2&&<pre className="tutorial-code"><code>{tutorial.code}</code></pre>}</section>)}<nav className="topic-navigation"><Link to={`/tutorials/${prev.slug}`}><span>Previous tutorial</span><b>{prev.title}</b></Link><Link to={`/tutorials/${next.slug}`}><span>Next tutorial</span><b>{next.title}</b></Link></nav></div></main>
 }
 return <main className="page"><div className="container"><header className="page-header"><span className="section-kicker">Tutorial library</span><h1>Programming tutorials</h1><p>Beginner to advanced guides for every language on UDIT.</p></header><div className="tutorial-grid">{tutorials.map(tutorial=><TutorialCard key={tutorial.slug} tutorial={tutorial}/>)}</div></div></main>
}
