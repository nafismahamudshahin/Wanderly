"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Destination } from "@/types/types"
import { useRouter } from "next/navigation"
const DESTINATIONS_API_URL = "http://localhost:5000/destination"


const DeleteDestinationDialog = ({ destination, }: { destination: Destination }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleDelete = async () => {
    const res = await fetch(`${DESTINATIONS_API_URL}/${destination._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Deleting destination is Success.")
      router.push("/destinations");
    } else {
      toast.error("Destination not deleted please try again.")
    }
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="border-destructive/40 text-destructive hover:bg-destructive/5 hover:text-destructive"
          />
        }
      >
        <Trash2 aria-hidden="true" className="size-4" />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Travel Package</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete “
            {destination.name}” from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            className="bg-destructive text-white hover:bg-destructive/90"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDestinationDialog
