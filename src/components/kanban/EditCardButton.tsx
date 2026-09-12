import React from "react";
import { Button } from "../ui/button";
import { PencilIcon } from "lucide-react";

type EditCardButtonProps = {
    onClick:(e:React.FormEvent<HTMLDivElement | HTMLButtonElement>) => void
};

const EditCardButton = ({ onClick }: EditCardButtonProps) => {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}>
      <PencilIcon className="size-4" />
    </Button>
  );
};

export default EditCardButton;
