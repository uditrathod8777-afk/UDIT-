import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { getBookmarks,toggleBookmark } from '../utils/storage';

export default function TutorialCard({tutorial}){
 const [bookmarks,setBookmarks]=useState(getBookmarks());
 const id=`tutorial-${tutorial.slug}`;
 const saved=bookmarks.some(item=>item.id===id);
 function bookmark(){setBookmarks(toggleBookmark({id,type:"tutorial",title:tutorial.title,to:`/tutorials/${tutorial.slug}`}))}
 return <article className="tutorial-card">
  <div className="tutorial-meta"><span>{tutorial.language}</span><div className="practice-card-actions"><span>{tutorial.level}</span><button className="icon-button" onClick={bookmark} aria-label="Bookmark tutorial"><Bookmark size={15} fill={saved?"currentColor":"none"}/></button></div></div>
  <h3>{tutorial.title}</h3><p>{tutorial.description}</p>
  <Link to={`/tutorials/${tutorial.slug}`} className="text-link">Read tutorial <ArrowRight size={16}/></Link>
 </article>
}
