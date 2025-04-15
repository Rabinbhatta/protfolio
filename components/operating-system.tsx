"use client"

import { useState } from "react"
import { DesktopOS } from "@/components/desktop-os"
import { MobileOS } from "@/components/mobile-os"

interface OperatingSystemProps {
  isMobile: boolean
}

export function OperatingSystem({ isMobile }: OperatingSystemProps) {
  const [openApp, setOpenApp] = useState<string | null>(null)

  const apps = [
    { id: "about", name: "About Me", icon: "user" },
    { id: "projects", name: "Projects", icon: "folder" },
    { id: "skills", name: "Skills", icon: "code" },
    { id: "contact", name: "Contact", icon: "mail" },
    { id: "resume", name: "Resume", icon: "file-text" },
  ]

  const handleOpenApp = (appId: string) => {
    setOpenApp(appId)
  }

  const handleCloseApp = () => {
    setOpenApp(null)
  }

  return isMobile ? (
    <MobileOS apps={apps} openApp={openApp} onOpenApp={handleOpenApp} onCloseApp={handleCloseApp} />
  ) : (
    <DesktopOS apps={apps} openApp={openApp} onOpenApp={handleOpenApp} onCloseApp={handleCloseApp} />
  )
}
