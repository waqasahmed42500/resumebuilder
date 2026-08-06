'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Editor = dynamic(() => import('../Editor/page'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function ClientEditorWrapper() {
  return <Editor />;
}
