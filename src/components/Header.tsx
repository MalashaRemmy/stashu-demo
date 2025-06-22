// File: components/Header.tsx
import React from 'react';
import { Button }  from './ui/Button';


export function Header() {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md flex items-center justify-between">
      <h1 className="text-2xl font-bold">StashU</h1>
      <div className="space-x-2">
        <Button variant="outline">Dashboard</Button>
        <Button variant="default">Create Plan</Button>
        <Button variant="destructive">Sign Out</Button>
      </div>
    </header>
  );
}
