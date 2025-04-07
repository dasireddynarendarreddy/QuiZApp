import React, { useRef, useState } from "react";

import { Toaster, toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {  Loader2 } from "lucide-react";
import emailjs from '@emailjs/browser';

const ContactForm = () => {
 
  const [loading, setLoading] = useState(false);
  const[userdata,setData]=useState({name: '',
    email: '',
    message:''})
  

  const sendFeedback = (e) => {
    e.preventDefault();
    setLoading(true);

    
      emailjs
  .send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, userdata, {
    publicKey:import.meta.env.VITE_PUBLICKEY_ID,
  })
  .then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
      toast.success("feed back sent sucessfully 😍",{
        duration:1000,
        closeButton:true
      })
      setData({
        name: '',
            email: '',
            message:''

      })
      setLoading(false)
    },
    (err) => {
        toast.error(err+'🥹',{
            duration:1000,
            closeButton:true
          })
      console.log('FAILED...', err);
    },
  );
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <Toaster position="top-right" richColors />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Feedback</CardTitle>
          <CardDescription>Enter your details to send feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={sendFeedback}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" value={userdata.name} onChange={(e)=>setData({...userdata,[e.target.name]:e.target.value})} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" value={userdata.email}  onChange={(e)=>setData({...userdata,[e.target.name]:e.target.value})} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your feedback here..."
                  value={userdata.message}
                  onChange={(e)=>setData({...userdata,[e.target.name]:e.target.value})}
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                {loading ? "Sending..." : "Send Feedback"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
