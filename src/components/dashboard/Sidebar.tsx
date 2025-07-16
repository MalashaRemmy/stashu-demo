import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3><i className="fas fa-piggy-bank"></i> StashU</h3>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link" end>
            <i className="fas fa-home"></i> Overview
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/dashboard/transactions" className="nav-link">
            <i className="fas fa-exchange-alt"></i> Transactions
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/dashboard/budgets" className="nav-link">
            <i className="fas fa-chart-pie"></i> Budgets
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/dashboard/goals" className="nav-link">
            <i className="fas fa-bullseye"></i> Goals
          </NavLink>
        </li>
      </ul>
    </div>
  );
}