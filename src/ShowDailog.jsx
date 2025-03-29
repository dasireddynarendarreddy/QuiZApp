import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "./components/ui/button"
import React, { useState } from 'react'

function ShowDailog({isError,setIsError}) {
    const[isOpen,setIsOpen]=useState(false)
  return (
    <div>
        <Dialog open={isError} onOpenChange={setIsError}>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Select Topic First</DialogTitle>
      <DialogDescription>
       In order to Attempt Select Topic First
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
            <Button onClick={() => setIsError(false)}>Close</Button>
          </DialogFooter>
        
  </DialogContent>
</Dialog>

      
    </div>
  )
}

export default ShowDailog
  