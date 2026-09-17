import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SettingsIcon } from "lucide-react";
import { ModeToggle } from "../kanban/ModeToggle";

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6 shadow-black/5">
      <h1 className="text-lg font-semibold text-foreground">
        Kanban Board
      </h1>

      <div className="flex items-center gap-2">
        <Input placeholder="Search cards..." />

        <Button variant="ghost">
          <SettingsIcon />
        </Button>

        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;