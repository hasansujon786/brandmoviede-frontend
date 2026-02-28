import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";
import {
  addCurrentCheckoutTicket,
  addCurrentCustomCoinBundle,
  addToCart,
  CartListItem,
  CartTicketItem,
  selectCartItems,
  selectCurrentCustomBundleCoin,
} from "./cartSlice";
import { useAuth } from "../auth/hooks";
import { usePathname, useRouter } from "next/navigation";
import { createQueryParams } from "@/lib/utils/formatters";
import { IAppCoinBundle } from "@/types";
import { getErrorMessage } from "@/lib/utils";
import {
  useCreateCoinCheckoutOrderWithPaypalMutation,
  IAppCoinCheckoutOrderParams,
  useCreateTicketCheckoutOrderWithPaypalMutation,
} from "../app";
import { useSelector } from "react-redux";
import { IAppCoinCheckoutOrderPaypalParams } from "@/types/app/checkout";

const DEFAULT_ERRROR_MSG = "Someting went wrong, try again later.";

export function useAppCart() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  function redirectToSignIn() {
    toast.error("Sign in to buy items");
    router.push(`/signin${createQueryParams({ redirect: pathname })}`);
    return false;
  }

  const addItemToCart = async (item: CartListItem) => {
    if (!isAuthenticated) {
      redirectToSignIn();
      return;
    }

    dispatch(addToCart(item));
    toast.success("Item added to cart");
  };

  const onBuyCustomCoinBundle = async (item?: IAppCoinBundle) => {
    if (!isAuthenticated) {
      redirectToSignIn();
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
  const [checkoutTicketWithPaypal] =
    useCreateTicketCheckoutOrderWithPaypalMutation();

  async function onBuyTicket(ticket: Omit<CartTicketItem, "type">) {
    if (!isAuthenticated) {
      redirectToSignIn();
      return;
    }

    try {
      const response = await checkoutTicketWithPaypal({
        ticketId: ticket.data.id,
      }).unwrap();

      if (!response.success) {
        toast.error(response.message || DEFAULT_ERRROR_MSG);
        return false;
      }

      if (!response.data.approval_url) {
        toast.error(DEFAULT_ERRROR_MSG);
        return false;
      }

      router.push(response.data.approval_url);
      return true;
    } catch (error) {
      const msg = getErrorMessage(error, "Failed payment with paypal");
      toast.error(msg);
      return false;
    }

    // const href = `/checkout/payment/${createQueryParams({
    //   type: "ticket",
    //   ticketId: ticket.data.id,
    // })}`;
    //
    // dispatch(
    //   addCurrentCheckoutTicket({
    //     type: "ticket",
    //     data: ticket.data,
    //     quantity: ticket.quantity || 1,
    //   }),
    // );
    //
    // router.push(href);
  }

  // payment checkout --------------------------------------------
  const [checkoutCoinWithPaypal] =
    useCreateCoinCheckoutOrderWithPaypalMutation();
  const cartItems = useSelector(selectCartItems);
  const currentCustomBundleCoin = useSelector(selectCurrentCustomBundleCoin);

  const tryCoinCheckoutWithPaypal = async ({
    sugoId,
    items,
  }: IAppCoinCheckoutOrderPaypalParams) => {
    if (!isAuthenticated) {
      redirectToSignIn();
      return;
    }

    try {
      const response = await checkoutCoinWithPaypal({
        sugoId,
        items,
      }).unwrap();

      if (!response.success) {
        toast.error(response.message || DEFAULT_ERRROR_MSG);
        return false;
      }

      if (!response.data.approval_url) {
        toast.error(DEFAULT_ERRROR_MSG);
        return false;
      }

      router.push(response.data.approval_url);
      return true;
    } catch (error) {
      const msg = getErrorMessage(error, "Failed payment with paypal");
      toast.error(msg);
      return false;
    }
  };

  function tryCoinCheckoutWithPaypalFromCart(sugoId: string) {
    tryCoinCheckoutWithPaypal({
      sugoId: sugoId,
      items: cartItems.map((i) => ({
        bundle_id: i.data.id,
        quantity: i.quantity ?? 1,
        coin_amount: i.data.coin_amount,
      })),
    });
  }

  function tryCoinCheckoutWithPaypalFromCustomBundle(sugoId: string) {
    if (!currentCustomBundleCoin) {
      return toast.error(
        "Failed to place order your custom bundle. Please try again.",
      );
    }

    tryCoinCheckoutWithPaypal({
      sugoId: sugoId,
      items: [
        {
          bundle_id: currentCustomBundleCoin.id,
          coin_amount: currentCustomBundleCoin.coin_amount,
        },
      ],
    });
  }

  return {
    addItemToCart,
    onBuyTicket,
    onBuyCustomCoinBundle,
    tryCoinCheckoutWithPaypalFromCart,
    tryCoinCheckoutWithPaypalFromCustomBundle,
  };
}
