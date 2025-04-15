"use client";

import {
  User,
  Folder,
  Code,
  Mail,
  FileText,
  ArrowLeft,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { AppContent } from "@/components/app-content";

interface App {
  id: string;
  name: string;
  icon: string;
}

interface MobileOSProps {
  apps: App[];
  openApp: string | null;
  onOpenApp: (appId: string) => void;
  onCloseApp: () => void;
}

export function MobileOS({
  apps,
  openApp,
  onOpenApp,
  onCloseApp,
}: MobileOSProps) {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "user":
        return <User className="h-8 w-8 text-white" />;
      case "folder":
        return <Folder className="h-8 w-8 text-white" />;
      case "code":
        return <Code className="h-8 w-8 text-white" />;
      case "mail":
        return <Mail className="h-8 w-8 text-white" />;
      case "file-text":
        return <FileText className="h-8 w-8 text-white" />;
      default:
        return <Folder className="h-8 w-8 text-white" />;
    }
  };

  return (
    <div
      className="h-full w-full bg-gradient-to-b from-blue-400 to-purple-500 p-4"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/75/87/df/7587df77ef521cf98057d0028ee983f1.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Status Bar */}
      <div className="flex items-center justify-between px-2 py-1 text-white">
        <div>{currentTime}</div>
        <div className="flex items-center gap-2">
          <Signal className="h-4 w-4" />
          <Wifi className="h-4 w-4" />
          <Battery className="h-4 w-4" />
        </div>
      </div>

      {/* App Grid */}
      <div className="mt-12 grid grid-cols-4 gap-4">
        {apps.map((app) => (
          <button
            key={app.id}
            className="flex flex-col items-center justify-center rounded-xl p-2"
            onClick={() => onOpenApp(app.id)}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
              {getIcon(app.icon)}
            </div>
            <span className="mt-1 text-xs font-medium text-white">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* App Sheet */}
      <Sheet
        open={openApp !== null}
        onOpenChange={() => openApp && onCloseApp()}
      >
        <SheetContent side="bottom" className="h-[90%] p-0">
          <div className="flex h-12 items-center border-b px-4">
            <button onClick={onCloseApp} className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <SheetTitle>
              {openApp && apps.find((app) => app.id === openApp)?.name}
            </SheetTitle>
          </div>
          <div className="h-[calc(100%-3rem)] overflow-auto p-4">
            {openApp && <AppContent appId={openApp} />}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
