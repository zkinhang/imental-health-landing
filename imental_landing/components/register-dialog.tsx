"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Mail } from "lucide-react";

interface RegisterDialogProps {
  trigger?: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
}

export default function RegisterDialog({ trigger, variant = "default" }: RegisterDialogProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate submission (frontend only)
      console.log("Demo request submitted for:", email);
      setSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
        setOpen(false);
      }, 3000);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset state when dialog closes
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={variant} size="default">
            Request Demo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request a Demo</DialogTitle>
          <DialogDescription>
            Enter your email to get early access to iMental State Tracker
          </DialogDescription>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Button type="submit" className="w-full" size="lg">
                Request Demo Access
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                We&apos;ll contact you with demo details soon
              </p>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Thank You!</h3>
              <p className="text-muted-foreground">
                We&apos;ve received your demo request. Check your inbox for next steps.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
