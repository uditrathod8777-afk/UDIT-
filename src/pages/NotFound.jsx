import { Link } from 'react-router-dom';
export default function NotFound(){return <main className="page container empty-state"><h1>Page not found</h1><p>The page you requested does not exist.</p><Link className="button primary" to="/">Return home</Link></main>}
