import { Link } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';

export default function ExamResult({language,result,retake}){
 const percentage=Math.round(result.score/10*100);
 return <section className="result-page">
  <div className="result-summary"><div><span className="result-status">{percentage>=60?"Pass":"Fail"}</span><h1>{result.score} / 10</h1><p>{percentage}% score</p></div><button className="button secondary" onClick={retake}><RotateCcw size={16}/> Retake exam</button></div>
  <h2>Answer review</h2>
  <div className="review-list">{result.review.map((item,i)=><article className={item.correct?"review correct":"review incorrect"} key={i}>
   <div className="review-title"><b>{i+1}. {item.question}</b><span>{item.correct?"Correct":"Incorrect"}</span></div>
   <p><b>Your answer:</b> {item.selected===null?"Not answered":item.options[item.selected]}</p>
   <p><b>Correct answer:</b> {item.options[item.answer]}</p><p className="explanation">{item.explanation}</p>
  </article>)}</div>
  <Link className="button primary" to={`/languages/${language.slug}`}>Back to {language.name}</Link>
 </section>
}
