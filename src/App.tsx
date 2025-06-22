import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile'; // Make sure to import the Profile component
import Layout from './components/Layout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} /> {/* Add this line */}
          {/* Add other nested routes here */}
        </Route>
      </Routes>
    </Router>
  );
}