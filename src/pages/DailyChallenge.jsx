import { useState } from 'react';
import { CalendarDays, CheckCircle2, Eye, EyeOff, Flame, Trophy } from 'lucide-react';
import { getDailyChallenge } from '../data/dailyChallenges';
import { read, write, updateProgress } from '../utils/storage';

export default function DailyChallenge(){
 const daily=getDailyChallenge();
 const [solution,setSolution]=useState(false);
 const [hints,setHints]=useState(false);
 const [history,setHistory]=useState(read("udit_challenge_history",{}));
 const completed=Boolean(history[daily.date]);
 const points=Object.values(history).reduce((sum,item)=>sum+(item.points||0),0);
 function complete(){
  const latest=read("udit_challenge_history",{});
  if(latest[daily.date])return;
  const next={...latest,[daily.date]:{title:daily.challenge.title,points:daily.challenge.points,difficulty:daily.challenge.difficulty}};
  write("udit_challenge_history",next);
  setHistory(next);
  updateProgress(progress=>({...progress,points:(progress.points||0)+daily.challenge.points}));
  setHints(false);
 }
 return <main className="page"><div className="container">
  <header className="page-header"><span className="section-kicker">Daily challenge</span><h1>One problem. Every day.</h1><p>Build consistency with a new deterministic challenge each date.</p></header>
  <div className="challenge-layout"><section className="challenge-main"><div className="challenge-head"><div><span className="difficulty">{daily.challenge.difficulty}</span><h2>{daily.challenge.title}</h2></div><div className="challenge-points"><Trophy/><b>{daily.challenge.points} pts</b></div></div><p className="challenge-description">{daily.challenge.description}</p><div className="challenge-example"><div><b>Example input</b><code>{daily.challenge.input}</code></div><div><b>Example output</b><code>{daily.challenge.output}</code></div></div><div className="challenge-buttons"><button className="button secondary" onClick={()=>setHints(!hints)}>{hints?<EyeOff size={16}/>:<Eye size={16}/>} {hints?"Hide hints":"Show hints"}</button><button className="button secondary" onClick={()=>setSolution(!solution)}>{solution?"Hide solution":"Reveal solution"}</button><button className="button primary" onClick={complete} disabled={completed}><CheckCircle2 size={16}/> {completed?"Completed":"Mark completed"}</button></div>{hints&&<div className="challenge-answer"><h3>Hints</h3>{daily.challenge.hints.map(hint=><p key={hint}>{hint}</p>)}</div>}{solution&&<div className="challenge-answer"><h3>Solution</h3><pre><code>{daily.challenge.solution}</code></pre></div>}</section>
  <aside className="challenge-side"><article><CalendarDays/><span>Today</span><b>{daily.date}</b></article><article><Trophy/><span>Total points</span><b>{points}</b></article><article><Flame/><span>Challenge history</span><b>{Object.keys(history).length} solved</b></article></aside></div>
  <section className="dashboard-section"><div className="section-heading"><div><span className="section-kicker">Your history</span><h2>Completed challenges</h2></div></div><div className="history-list">{Object.entries(history).reverse().map(([date,item])=><article key={date}><span>{date}</span><b>{item.title}</b><em>{item.difficulty} · +{item.points} pts</em></article>)}{!Object.keys(history).length&&<div className="empty-state"><h2>No challenges completed yet</h2><p>Complete today's challenge to start your history.</p></div>}</div></section>
 </div></main>
}
