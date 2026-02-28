"use client";

import { usePaymentStatus } from "@/components/pages/Checkout/context/PaymentStatusContext";
import { Spinner } from "@/components/ui/spinner";
import { getErrorMessage } from "@/lib/utils";
import { useCapturePaypalOrderMutation } from "@/redux/api";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("token");
  const router = useRouter();

  const [captureOrder, { data, isLoading }] = useCapturePaypalOrderMutation();
  const dispatch = useAppDispatch();

  // https://brand-light-shop.de/checkout/success?token=8BR50059MR636525V&PayerID=6AFTXYU8RBE56

  const { status, setStatus, resetStatus } = usePaymentStatus();

  useEffect(() => {
    const handleCapture = async (orderId: string | null) => {
      if (!orderId) {
        toast.error("Someting went wrong. Please try again.");
        return;
      }

      try {
        const response = await captureOrder({
          orderId: orderId,
        }).unwrap();

        if (!response.success) {
          toast.error(
            response?.error ||
              response.message ||
              "Someting went wrong. Please try again.",
          );

          return false;
        }

        // console.log("success page response", orderId, response);
        router.replace("/checkout/result");
        dispatch(clearCart());
        return true;
      } catch (err) {
        toast.error(getErrorMessage(err));
        return false;
      }
    };

    (async () => {
      if (data == null) {
        const isSuccess = await handleCapture(orderId);
        setStatus(isSuccess ? "success" : "failed");
      }
    })();
  }, [setStatus, orderId, captureOrder, router, data, dispatch]);

  if (isLoading || status === null) {
    return (
      <div className="flex items-center justify-center pt-32">
        <Spinner className="text-primary size-8" />
      </div>
    );
  }

  return null;
}
