'use client'

import { useState } from 'react'
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

export default function Page() {
  const [selectedEmail, setSelectedEmail] = useState(null)

  return (
    <SidebarProvider style={{ "--sidebar-width": "350px" }}>
      <AppSidebar onEmailSelect={setSelectedEmail} />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{selectedEmail?.subject || 'Inbox'}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {selectedEmail ? (
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{selectedEmail.subject}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                From: {selectedEmail.senderName} ({selectedEmail.senderEmail})<br />
                Received: {new Date(selectedEmail.dateReceived).toLocaleString()}
              </p>
              <div className="whitespace-pre-wrap text-base leading-relaxed">
                {selectedEmail.content || 'No content'}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Select an email to view its contents</p>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
