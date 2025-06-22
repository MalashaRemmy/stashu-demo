import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [linkedAccounts, setLinkedAccounts] = useState<string[]>(['student_email@university.edu']);

  const handleAddAccount = (newAccount: string) => {
    if (newAccount && !linkedAccounts.includes(newAccount)) {
      setLinkedAccounts([...linkedAccounts, newAccount]);
    }
  };

  const handleRemoveAccount = (accountToRemove: string) => {
    setLinkedAccounts(linkedAccounts.filter(acc => acc !== accountToRemove));
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Notification preferences */}
      <div className="settings-section">
        <h3>Notifications</h3>
        <label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
          />
          Enable email notifications
        </label>
      </div>

      {/* Theme preferences */}
      <div className="settings-section">
        <h3>Appearance</h3>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          Dark Mode
        </label>
      </div>

      {/* Linked accounts */}
      <div className="settings-section">
        <h3>Linked Accounts</h3>
        <ul>
          {linkedAccounts.map((account) => (
            <li key={account}>
              {account}
              <button onClick={() => handleRemoveAccount(account)}>Remove</button>
            </li>
          ))}
        </ul>
        <input
          type="email"
          placeholder="Add new email"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddAccount(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>

      {/* Danger zone (e.g., logout/delete account) */}
      <div className="danger-zone">
        <h3>Danger Zone</h3>
        <button onClick={() => confirm('Are you sure?') && console.log('Logged out')}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;