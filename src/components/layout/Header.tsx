import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SettingsIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6 bg-white shadow-black/5">
      <h1 className="text-lg font-semibold">Kanban Board</h1>
      <div className="flex items-center gap-2">
        <Input placeholder="Search cards..." />
        <Button variant={"ghost"}>
          <SettingsIcon />
        </Button>
      </div>
    </header>
  );
};

export default Header;
