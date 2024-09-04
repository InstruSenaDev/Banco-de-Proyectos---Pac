import { Button } from '@/components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";

export const ModalComent = () => (
  <div className="flex justify-center">
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Account Created Successfully</DialogTitle>
          <DialogDescription className="mt-1 text-sm leading-6">
            Your account has been created successfully. You can now login to
            your account. For more information, please contact us.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button
              className="mt-2 w-full sm:mt-0 sm:w-fit"
              variant="secondary"
            >
              Go back
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-full sm:w-fit">Ok, got it!</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
);