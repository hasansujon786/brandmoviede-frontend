"use client";

import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface CheckoutGuestUserDialogProps extends React.ComponentProps<
  typeof Dialog
> {
  onGuestContinue: () => void;
}

export default function CheckoutGuestUserDialog({
  onOpenChange,
  open,
  ...props
}: CheckoutGuestUserDialogProps) {
  const [showSignIn, setShowSignIn] = useState(false);

  function handleOpenChange(v: boolean) {
    onOpenChange?.call(null, v);
    setTimeout(() => {
      if (!v && showSignIn) {
        setShowSignIn(false);
      }
    }, 500);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} {...props}>
      <DialogContent className="bg-white sm:max-w-[520px]">
        {showSignIn ? (
          <LoginForm
            onlyCard
            onSignIn={() => handleOpenChange(false)}
            type="user"
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Proceed as guest or sign in?</DialogTitle>

              <div className="space-y-4 pt-2 text-sm leading-relaxed">
                <p>
                  <strong>Data Integrity:</strong> Registered users ensure that
                  every transaction is traceable and transparent, reducing the
                  risk of lost orders or fraudulent claims.
                </p>

                <p>
                  The guest checkout option significantly increases the risk of
                  losing user data and makes customer support more difficult in
                  case of claims.
                </p>

                <p className="font-medium">Proceed as a guest or sign in?</p>
              </div>
            </DialogHeader>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="primary-inverse"
                className="bg-transparent"
                onClick={props?.onGuestContinue}
              >
                Continue as Guest
              </Button>

              <Button variant="primary" onClick={() => setShowSignIn(true)}>
                Sign In
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
