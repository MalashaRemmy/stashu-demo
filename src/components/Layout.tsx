import { Outlet } from 'react-router-dom';
// Remove any other Outlet imports
export default function Layout() {
  return (
    <div>
      <header style={{ background: 'lightgray', padding: '10px' }}>
        My App Header
      </header>
      <main>
        <Outlet /> {/* This renders the Home component */}
      </main>
      <footer style={{ background: 'lightgray', padding: '10px' }}>
        My App Footer
      </footer>
    </div>
  );
}



