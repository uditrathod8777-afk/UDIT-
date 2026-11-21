import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { getBookmarks,toggleBookmark } from '../utils/storage';

export default function LanguageCard({language}){
 const [bookmarks,setBookmarks]=useState(getBookmarks());
 const id=`language-${language.slug}`;
 const saved=bookmarks.some(item=>item.id===id);
 function bookmark(e){e.preventDefault();e.stopPropagation();setBookmarks(toggleBookmark({id,type:"language",title:language.name,to:`/languages/${language.slug}`}))}
 return <article className="language-card">
  <div className="language-card-top"><span className="language-initial">{language.name.slice(0,1)}</span><div className="practice-card-actions"><span className="difficulty">{language.difficulty}</span><button className="icon-button" onClick={bookmark} aria-label="Bookmark language"><Bookmark size={15} fill={saved?"currentColor":"none"}/></button></div></div>
  <h3>{language.name}</h3><p>{language.description}</p>
  <div className="card-meta"><span>{language.examples} examples</span><span>10 exam questions</span></div>
  <Link className="text-link" to={`/languages/${language.slug}`}>Explore language <ArrowUpRight size={16}/></Link>
 </article>
}
