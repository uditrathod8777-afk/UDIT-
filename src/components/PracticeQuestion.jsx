import { useState } from 'react';
import { Eye, EyeOff, Bookmark, CheckCircle2 } from 'lucide-react';
import { getBookmarks, getProgress, toggleBookmark, updateProgress } from '../utils/storage';

export default function PracticeQuestion({question,index}){
 const [visible,setVisible]=useState(false);
 const [hintVisible,setHintVisible]=useState(false);
 const [bookmarks,setBookmarks]=useState(getBookmarks());
 const [completed,setCompleted]=useState((getProgress().practice||[]).includes(question.id));
 const saved=bookmarks.some(item=>item.id===question.id);
 function bookmark(){
  setBookmarks(toggleBookmark({id:question.id,type:"practice",title:question.title,to:"/practice"}));
 }
 function complete(){
  updateProgress(progress=>({...progress,practice:[...new Set([...(progress.practice||[]),question.id])]}));
  setCompleted(true);
 }
 return <article className="practice-card">
  <div className="practice-card-head"><span>Question {index+1}</span><div className="practice-card-actions"><span className="difficulty">{question.difficulty}</span><button className={saved?"icon-button saved":"icon-button"} onClick={bookmark} aria-label="Bookmark practice question"><Bookmark size={16} fill={saved?"currentColor":"none"}/></button></div></div>
  <h2>{question.title}</h2><p className="practice-prompt">{question.prompt}</p>
  <div className="starter-code"><b>Starter code</b><pre><code>{question.starter}</code></pre></div>
  <div className="practice-buttons">
   <button className="button secondary" onClick={()=>setHintVisible(!hintVisible)}>{hintVisible?"Hide hint":"Show hint"}</button>
   <button className="button secondary" onClick={()=>setVisible(!visible)}>{visible?<EyeOff size={16}/>:<Eye size={16}/>} {visible?"Hide solution":"Show solution"}</button>
   <button className="button primary" onClick={complete} disabled={completed}><CheckCircle2 size={16}/> {completed?"Completed":"Mark completed"}</button>
  </div>
  {hintVisible&&<div className="practice-answer"><h4>Hint</h4><p>{question.hint}</p></div>}
  {visible&&<div className="practice-answer"><h4>Solution approach</h4><code>{question.solution}</code><h4>Explanation</h4><p>{question.explanation}</p></div>}
 </article>
}
