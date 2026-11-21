export default function ExamQuestion({question,index,total,selected,onSelect,onPrevious,onNext,onSubmit,last}){
 return <section className="exam-panel">
  <div className="exam-progress"><span>Question {index+1} of {total}</span><div><i style={{width:`${((index+1)/total)*100}%`}}/></div></div>
  <h2>{question.q}</h2>
  <div className="option-list">{question.options.map((option,i)=><button key={i} className={selected===i?"option selected":"option"} onClick={()=>onSelect(i)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>
  <div className="exam-actions"><button className="button secondary" onClick={onPrevious} disabled={index===0}>Previous</button>{last?<button className="button primary" onClick={onSubmit}>Submit exam</button>:<button className="button primary" onClick={onNext}>Next question</button>}</div>
 </section>
}
