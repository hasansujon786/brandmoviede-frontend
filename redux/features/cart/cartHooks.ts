import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";
import {
  addCurrentCheckoutTicket,
  addCurrentCustomCoinBundle,
  addToCart,
  CartListItem,
  CartTicketItem,
} from "./cartSlice";
import { useAuth } from "../auth/hooks";
import { usePathname, useRouter } from "next/navigation";
import { createQueryParams } from "@/lib/utils/formatters";
import { IAppCoinBundle } from "@/types";

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

  const onBuyCustomCoinBundle = async (item?: IAppCoinBundle) => {
    if (!isAuthenticated) {
      toast.error("Sign in to buy items");
      router.push(`/signin${createQueryParams({ redirect: pathname })}`);
      return;
    }

    if (!item) {
      return;
    }

    dispatch(addCurrentCustomCoinBundle(item));
    router.push(
      `/checkout${createQueryParams({ type: "coin", isCustomBundle: true })}`,
    );
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

  return { addItemToCart, onBuyTicket, onBuyCustomCoinBundle };
}
