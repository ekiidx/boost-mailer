"use client"

import React, { useEffect, useState } from "react"
import { ArchiveX, Inbox, Send, Trash2 } from "lucide-react"

import { NavUser } from "@/components/nav-user"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"

const data = {
  user: {
    name: "BM",
    email: "boost@vuedesign.co",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Sent",
      url: "#",
      icon: Send,
      isActive: false,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
      isActive: false,
    },
  ]
}

export function AppSidebar({ onEmailSelect, ...props }) {
  const [activeItem, setActiveItem] = useState(data.navMain[0])
  const [mails, setMails] = useState([])
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const { setOpen } = useSidebar()

  useEffect(() => {
    const fetchEmails = async () => {
      const res = await fetch("/api/emails")
      const data = await res.json()
      setMails(data)
    }
    fetchEmails()
  }, [])

const filteredMails = mails.filter((mail) => {
  const sender = mail.senderName?.toLowerCase() || ""
  const subject = mail.subject?.toLowerCase() || ""
  const query = searchQuery.toLowerCase()

  // Match search text
  const matchesSearch = sender.includes(query) || subject.includes(query)

  // Check which folder we're in
  let isInFolder = false
  if (activeItem.title === "Inbox") {
    isInFolder = !mail.isSent && !mail.isDeleted
  } else if (activeItem.title === "Sent") {
    isInFolder = mail.isSent && !mail.isDeleted
  } else if (activeItem.title === "Trash") {
    isInFolder = mail.isDeleted
  } else {
    isInFolder = true
  }

  // Filter by unread toggle
  let matchesUnreadFilter = true
  if (showUnreadOnly) {
    matchesUnreadFilter = !mail.isRead
  }

  return matchesSearch && isInFolder && matchesUnreadFilter
})

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* Mini sidebar (icons) */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    {/* <Command className="size-4" /> */}
                    <img width="17" height="17" src="/flame.svg" />
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{ children: item.title, hidden: false }}
                      onClick={() => {
                        setActiveItem(item)
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* Expanded sidebar with email list */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unread</span>
              <Switch
                className="shadow-none"
                checked={showUnreadOnly}
                onCheckedChange={setShowUnreadOnly}
              />
            </Label>
          </div>
          <SidebarInput
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {filteredMails.map((mail) => (
                <a
                  href="#"
                  key={mail.id}
                  onClick={() => {
                    setSelectedEmail(mail)
                    onEmailSelect?.(mail)
                  }}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.senderName}</span>
                    <span className="ml-auto text-xs">{mail.date}</span>
                  </div>
                  <span className="font-medium">{mail.subject}</span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
