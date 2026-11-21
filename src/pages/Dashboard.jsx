import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, CheckCircle2, Flame, Languages as LanguagesIcon, RotateCcw, Trophy } from 'lucide-react';
import { languages } from '../data/languages';
import { getProgress, saveProgress } from '../utils/storage';
import { read } from '../utils/storage';

export default function Dashboard(){
 const [progress,setProgress]=useState(getProgress());
 useEffect(()=>{const refresh=()=>setProgress(getProgress());window.addEventListener("udit-progress",refresh);return()=>window.removeEventListener("udit-progress",refresh)},[]);
 const lessonCount=(progress.lessons||[]).length;
 const challengeCount=Object.keys(read("udit_challenge_history",{})).length;
 const practiceCount=(progress.practice||[]).length;
 const examScore=Object.values(progress.exams||{}).reduce((sum,result)=>sum+(result.score||0),0);
 const progressPercent=Math.min(100,Math.round(((lessonCount+practiceCount+challengeCount)/220)*100));
 const achievements=[
  {title:"First Lesson Completed",description:"Complete your first code example.",unlocked:lessonCount>=1},
  {title:"First Challenge Solved",description:"Complete one daily challenge.",unlocked:challengeCount>=1},
  {title:"5 Challenges Completed",description:"Solve five daily challenges.",unlocked:challengeCount>=5},
  {title:"10 Challenges Completed",description:"Solve ten daily challenges.",unlocked:challengeCount>=10},
  {title:"5 Languages Explored",description:"Visit five programming languages.",unlocked:(progress.visitedLanguages||[]).length>=5},
  {title:"100% Course Progress",description:"Complete the full learning journey.",unlocked:progressPercent>=100}
 ];
 function reset(){
  if(window.confirm("Reset all UDIT learning progress, challenge history, and points?")){
   saveProgress({lessons:[],practice:[],exams:{},visitedLanguages:[],streak:0,lastActiveDate:null,points:0});
   localStorage.removeItem("udit_challenge_history");
   setProgress(getProgress());
  }
 }
 const continueLanguage=(progress.visitedLanguages||[]).slice(-1)[0]||"python";
 return <main className="page"><div className="container">
  <header className="dashboard-header"><div><span className="section-kicker">Student dashboard</span><h1>Learning overview</h1></div><button className="button secondary" onClick={reset}><RotateCcw size={16}/> Reset progress</button></header>
  <div className="dashboard-stats">
   <article><LanguagesIcon/><span>Languages available</span><b>20</b></article>
   <article><BookOpen/><span>Completed lessons</span><b>{lessonCount}</b></article>
   <article><CheckCircle2/><span>Coding challenges</span><b>{challengeCount}</b></article>
   <article><Trophy/><span>Total quiz score</span><b>{examScore}</b></article>
  </div>
  <div className="dashboard-grid"><section className="progress-card"><div className="progress-heading"><div><span>Overall learning progress</span><b>{progressPercent}%</b></div><div className="progress-ring" style={{"--progress":`${progressPercent}%`}}><b>{progressPercent}%</b></div></div><div className="progress-bar"><i style={{width:`${progressPercent}%`}}/></div></section><section className="streak-card"><Flame/><div><span>Daily coding streak</span><b>{progress.streak||0} days</b></div></section></div>
  <section className="dashboard-section"><div className="section-heading"><div><span className="section-kicker">Keep going</span><h2>Continue learning</h2></div></div><Link className="continue-card" to={`/languages/${continueLanguage}`}><span className="language-initial">{languages.find(l=>l.slug===continueLanguage)?.name.slice(0,1)||"U"}</span><div><b>{languages.find(l=>l.slug===continueLanguage)?.name||"Python"}</b><p>Continue with examples and lessons</p></div><span>Continue →</span></Link></section>
  <section className="dashboard-section"><div className="section-heading"><div><span className="section-kicker">Recently visited</span><h2>Your languages</h2></div></div><div className="recent-list">{(progress.visitedLanguages||[]).slice(-6).reverse().map((slug,index)=><Link key={`${slug}-${index}`} to={`/languages/${slug}`}><span>{languages.find(l=>l.slug===slug)?.name.slice(0,1)||"U"}</span><b>{languages.find(l=>l.slug===slug)?.name||slug}</b></Link>)}{!(progress.visitedLanguages||[]).length&&<p className="muted">Visit a language to build your learning history.</p>}</div></section>
  <section className="dashboard-section"><div className="section-heading"><div><span className="section-kicker">Achievements</span><h2>Milestones</h2></div></div><div className="achievement-grid">{achievements.map(achievement=><article key={achievement.title} className={achievement.unlocked?"achievement unlocked":"achievement"}><Award/><div><h3>{achievement.title}</h3><p>{achievement.description}</p></div><span>{achievement.unlocked?"Unlocked":"Locked"}</span></article>)}</div></section>
 </div></main>
}
