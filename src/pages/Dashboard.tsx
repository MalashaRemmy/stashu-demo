import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import {Header} from '../components/Header';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}