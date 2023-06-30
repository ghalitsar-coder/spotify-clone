// import { Button } from "@/components/ui/button";
import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Modal";
import { AuthModalStore } from "@/utils/hooks/useAuthModal";

interface BasicModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onChange(params: boolean): void;
}

export function BasicModal({
  children,
  title,
  isOpen,
  onChange,
}: BasicModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900 text-slate-100  ">
        <DialogHeader>
          <DialogTitle> {title} </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
