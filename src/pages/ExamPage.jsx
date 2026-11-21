import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLanguage } from '../data/languages';
import { exams } from '../data/exams';
import ExamQuestion from '../components/ExamQuestion';
import ExamResult from '../components/ExamResult';
import { updateProgress } from '../utils/storage';

export default function ExamPage(){
 const {slug}=useParams(),language=getLanguage(slug);
 const [index,setIndex]=useState(0),[answers,setAnswers]=useState(Array(10).fill(null)),[submitted,setSubmitted]=useState(false),[examResult,setExamResult]=useState(null);
 if(!language) return <main className="page container"><h1>Exam not found</h1><Link to="/exams">Browse exams</Link></main>;
 const bank=exams[slug];
 function submit(){
  const review=bank.map((question,i)=>({...question,selected:answers[i],correct:answers[i]===question.answer}));
  const score=review.filter(item=>item.correct).length;
  return {score,review};
 }
 function retake(){setIndex(0);setAnswers(Array(10).fill(null));setSubmitted(false);setExamResult(null)}
 function finish(){
  const result=submit();
  setExamResult(result);
  setSubmitted(true);
  updateProgress(progress=>({...progress,exams:{...(progress.exams||{}),[slug]:{score:result.score,percentage:result.score*10}}}));
 }
 if(submitted&&examResult){return <main className="page exam-page"><div className="container"><ExamResult language={language} result={examResult} retake={retake}/></div></main>}
 return <main className="page exam-page"><div className="container"><Link className="back-link" to="/exams">← All exams</Link><header className="exam-header"><div><span className="section-kicker">{language.name}</span><h1>{language.name} Exam</h1></div><span>Passing score: 6 / 10</span></header><ExamQuestion question={bank[index]} index={index} total={10} selected={answers[index]} onSelect={value=>setAnswers(a=>a.map((answer,i)=>i===index?value:answer))} onPrevious={()=>setIndex(i=>Math.max(0,i-1))} onNext={()=>setIndex(i=>Math.min(9,i+1))} onSubmit={finish} last={index===9}/></div></main>
}
