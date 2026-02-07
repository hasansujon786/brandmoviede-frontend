import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";
import {
  addCurrentCheckoutTicket,
  addToCart,
  CartListItem,
  CartTicketItem,
} from "./cartSlice";
import { useAuth } from "../auth/hooks";
import { usePathname, useRouter } from "next/navigation";
import { createQueryParams } from "@/lib/utils/formatters";

export function useAppCart() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const addItemToCart = async (item: CartListItem) => {
    if (!isAuthenticated) {
      toast.error("Sign in to add items in your cart");
      router.push(`/signin${createQueryParams({ redirect: pathname })}`);
      return;
    }

    dispatch(addToCart(item));
    toast.success("Item added to cart");
  };

  function onBuyTicket(ticket: Omit<CartTicketItem, "type">) {
    if (!isAuthenticated) {
      toast.error("Sign in to buy tickets");
      router.push(`/signin${createQueryParams({ redirect: pathname })}`);
      return;
    }

    const href = `/checkout/payment/${createQueryParams({
      type: "ticket",
      ticketId: ticket.data.id,
    })}`;

    dispatch(
      addCurrentCheckoutTicket({
        type: "ticket",
        data: ticket.data,
        quantity: ticket.quantity || 1,
      }),
    );

    router.push(href);
  }

  return { addItemToCart, onBuyTicket };
}
