import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBoardStore } from "@/stores/board.store";
import { CirclePlusIcon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export function AddCardButton({ listId }: { listId: number }) {
  const [text, setText] = React.useState("");
  const addCard = useBoardStore((state) => state.addCard)

  const handleAddCard = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (text.trim() === "") return;
    addCard(listId, text)
    setText("")
    toast.success("Add Card!")
  };
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="default">
            <CirclePlusIcon className=" cursor-pointer size-5" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleAddCard} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
            <DialogDescription>
              Enter a title for the new card and add it to this list.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title-1">Title Card</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                id="title-1"
                name="title"
                placeholder="e.g.Design profile page"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
           <DialogClose render={<Button type="submit">Add Card</Button>}/> 
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
