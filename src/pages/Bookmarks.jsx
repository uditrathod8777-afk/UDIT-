import { Link } from 'react-router-dom';
import { BookmarkX } from 'lucide-react';
import { getBookmarks,toggleBookmark } from '../utils/storage';
import { useState } from 'react';

export default function Bookmarks(){
 const [bookmarks,setBookmarks]=useState(getBookmarks());
 function remove(id){setBookmarks(toggleBookmark(bookmarks.find(item=>item.id===id)))}
 return <main className="page"><div className="container"><header className="page-header"><span className="section-kicker">Saved learning</span><h1>Your bookmarks</h1><p>Quick access to the tutorials, examples, practice questions, and languages you saved.</p></header>{bookmarks.length?<div className="bookmark-grid">{bookmarks.map(item=><article key={item.id}><div><span>{item.type}</span><h2>{item.title}</h2></div><div className="bookmark-actions"><Link className="button secondary" to={item.to}>Open</Link><button className="icon-button" onClick={()=>remove(item.id)} aria-label="Remove bookmark"><BookmarkX size={17}/></button></div></article>)}</div>:<div className="empty-state"><BookmarkX/><h2>No bookmarks yet</h2><p>Bookmark languages, tutorials, examples, or practice questions to see them here.</p><Link className="button primary" to="/languages">Explore languages</Link></div>}</div></main>
}
