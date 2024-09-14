import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './Dialog.tsx'
import { Button } from './Button.tsx'
import { Input } from './Input.tsx'

export default function AddStock() {
  return (
    <>
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="h-10 text-base"
              variant="secondary"
            >
              Add Stock
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="mb-4">Add Stock</DialogTitle>
              {/*<DialogDescription className="mt-1 text-sm leading-6">*/}
              {/*  Search for symbol or company name*/}
              {/*</DialogDescription>*/}
              <Input placeholder="Search for symbol or company name" />
            </DialogHeader>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button
                  className="mt-2 w-full sm:mt-0 sm:w-fit"
                  variant="secondary"
                >
                  Go Back
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="w-full sm:w-fit">
                  Add Stock
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
