// File: components/Footer.tsx
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white p-4 text-center text-sm">
      &copy; {new Date().getFullYear()} StashU. All rights reserved.
    </footer>
  );
}