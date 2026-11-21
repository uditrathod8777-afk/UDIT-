import { Link } from 'react-router-dom';
import { languages } from '../data/languages';

export default function Footer(){
 return <footer className="footer">
  <div className="container footer-grid">
   <div><Link className="brand" to="/"><span className="brand-mark">U</span><span>UDIT</span></Link><p className="footer-brand-text">Your Complete Programming Knowledge Hub.</p></div>
   <div><h4>Platform</h4><Link to="/languages">Languages</Link><Link to="/tutorials">Tutorials</Link><Link to="/practice">Practice</Link><Link to="/exams">Exams</Link></div>
   <div><h4>Popular languages</h4>{languages.slice(0,8).map(l=><Link key={l.slug} to={`/languages/${l.slug}`}>{l.name}</Link>)}</div>
   <div><h4>Explore</h4><Link to="/about">About UDIT</Link><Link to="/search">Search</Link></div>
  </div>
  <div className="container footer-bottom"><span>© 2026 UDIT. All rights reserved.</span><span>Code. Create. Conquer.</span></div>
 </footer>
}
