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
              <DialogTitle>Wichtiger Hinweis für Gastkäufer!</DialogTitle>

              <div className="space-y-4 pt-2 text-sm leading-relaxed">
                <p>
                  <strong>Datenintegrität:</strong>
                  Registrierte Nutzer stellen sicher, dass jede Transaktion
                  nachvollziehbar und transparent ist, was das Risiko verlorener
                  Bestellungen oder betrügerischer Ansprüche reduziert.
                </p>

                <p>
                  Gast-Checkout-Option erhöht das Risiko, Nutzerdaten zu
                  verlieren, erheblich und erschwert den Kundensupport bei
                  Ansprüchen.
                </p>

                {/* Continue as a guest or log in? */}
                <p className="font-medium">
                  Fortfahren als Gast oder anmelden ?
                </p>
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
