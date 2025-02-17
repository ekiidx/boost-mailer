'use client';

import { useState } from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// const res = await fetch('/api/prompts');
// const data = await res.json();
// console.log(data.logs); // display previous prompt/response history

export default function CreatePrompt() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log('LLM Response:', data);

      if (res.ok) {
        setResponse(data.content || 'No content in response.');
      } else {
        setResponse(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error on frontend:', err);
      setResponse('Request failed.');
    }

    setLoading(false);
  };

  return (


 <SidebarProvider style={{ "--sidebar-width": "350px" }}>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        
        </header>
        <main style={{ padding: 40 }}>
          <h1>Llamafile RAG Prompt</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              rows={5}
              cols={50}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt..."
            />
            <br />
            <button type="submit" disabled={loading}>
              {loading ? 'Generating...' : 'Submit'}
            </button>
          </form>

          {response && (
            <div style={{ marginTop: 20 }}>
              <h3>Response:</h3>
              <pre>{response}</pre>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
