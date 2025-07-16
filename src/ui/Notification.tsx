import { useState } from 'react';

export default function Notification() {
  const [show, setShow] = useState(false);
  const [message] = useState('');
  const [type] = useState<'success' | 'error' | 'info'>('info');

  // TODO: Implement notification system with context or state management
  // This is just a placeholder component

  if (!show) return null;

  const bgColor = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  }[type];

  return (
    <div className={`fixed bottom-4 right-4 border ${bgColor} px-4 py-3 rounded`} role="alert">
      <div className="flex items-center">
        <span className="mr-2">
          {type === 'success' && (
            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {type === 'error' && (
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {type === 'info' && (
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </span>
        <span className="font-medium">{message}</span>
        <button
          onClick={() => setShow(false)}
          className="ml-auto text-xl font-semibold"
        >
          &times;
        </button>
      </div>
    </div>
  );
}