"use client";

import { useState, useRef, useEffect } from "react";
import { User, Folder, Code, Mail, FileText, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppContent } from "@/components/app-content";

interface App {
  id: string;
  name: string;
  icon: string;
}

interface DesktopOSProps {
  apps: App[];
  openApp: string | null;
  onOpenApp: (appId: string) => void;
  onCloseApp: () => void;
}

export function DesktopOS({
  apps,
  openApp,
  onOpenApp,
  onCloseApp,
}: DesktopOSProps) {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const startMenuRef = useRef<HTMLDivElement>(null);
  const appWindowRef = useRef<HTMLDivElement>(null);

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case "user":
        return <User className={`h-8 w-8 ${color}`} />;
      case "folder":
        return <Folder className={`h-8 w-8 ${color}`} />;
      case "code":
        return <Code className={`h-8 w-8 ${color}`} />;
      case "mail":
        return <Mail className={`h-8 w-8 ${color}`} />;
      case "file-text":
        return <FileText className={`h-8 w-8 ${color}`} />;
      default:
        return <Folder className={`h-8 w-8 ${color}`} />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(event.target as Node)
      ) {
        setShowStartMenu(false);
      }

      if (
        appWindowRef.current &&
        !appWindowRef.current.contains(event.target as Node)
      ) {
        // Uncomment below line if you want to close the window when clicked outside
        onCloseApp();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCloseApp]);

  return (
    <div
      className="relative h-full w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/75/87/df/7587df77ef521cf98057d0028ee983f1.gif')",
      }}
    >
      {/* Desktop Icons */}
      <div className="p-4">
        {apps.map((app) => (
          <button
            key={app.id}
            className="flex flex-col items-center justify-center rounded w-24 h-20 p-2 hover:bg-gray-700"
            onClick={() => {
              onOpenApp(app.id);
              setMinimized(false);
            }}
          >
            {getIcon(app.icon, "text-white")}
            <span className="mt-1 text-sm font-medium text-white drop-shadow-md">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 flex h-12 items-center justify-center bg-white px-2">
        <div className="flex justify-between w-1/2 ml-auto">
          <div className="flex items-center space-x-2">
            {/* Start Button */}
            <Button
              variant="ghost"
              className="h-10 w-10 rounded-none p-0"
              onClick={() => setShowStartMenu(!showStartMenu)}
            >
              <div className="grid h-6 w-6 grid-cols-2 gap-0.5">
                <div className="bg-blue-500"></div>
                <div className="bg-blue-500"></div>
                <div className="bg-blue-500"></div>
                <div className="bg-blue-500"></div>
              </div>
            </Button>

            {/* Taskbar App Icon */}
            {openApp && (
              <button
                className="ml-2 flex items-center gap-2 rounded px-3 py-1 text-white hover:bg-gray-300"
                onClick={() => setMinimized(false)}
              >
                {getIcon(
                  apps.find((a) => a.id === openApp)?.icon || "",
                  "text-black"
                )}
              </button>
            )}
          </div>
          <div className="ml-auto flex items-center text-sm text-black">
            {currentTime}
          </div>
        </div>
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div
          ref={startMenuRef}
          className="absolute bottom-12 left-[45%] w-64 bg-white p-4 shadow-lg"
        >
          <div className="grid gap-2">
            {apps.map((app) => (
              <button
                key={app.id}
                className="flex items-center gap-3 rounded p-2 text-left text-black hover:bg-gray-200"
                onClick={() => {
                  onOpenApp(app.id);
                  setMinimized(false);
                  setShowStartMenu(false);
                }}
              >
                {getIcon(app.icon, "text-black")}
                <span>{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* App Window */}
      {openApp && !minimized && (
        <div
          ref={appWindowRef}
          className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded border border-gray-600 bg-white shadow-xl"
        >
          {/* Title Bar */}
          <div className="flex h-8 items-center justify-between bg-gray-800 px-3">
            <div className="text-sm font-medium text-white">
              {apps.find((app) => app.id === openApp)?.name}
            </div>
            <div className="flex items-center space-x-2">
              {/* Minimize Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-sm hover:bg-gray-700"
                onClick={() => setMinimized(true)}
              >
                <Minus className="h-3 w-3 text-white" />
              </Button>
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-sm hover:bg-red-700"
                onClick={() => {
                  setMinimized(false);
                  onCloseApp();
                }}
              >
                <X className="h-3 w-3 text-white" />
              </Button>
            </div>
          </div>

          {/* Window Content */}
          <div className="h-[calc(100%-2rem)] overflow-auto p-4">
            <AppContent appId={openApp} />
          </div>
        </div>
      )}
    </div>
  );
}
