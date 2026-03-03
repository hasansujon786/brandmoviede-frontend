"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { inputStyles } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useGetCustomCoinBundleQuery } from "@/redux/api";
import { useAppCart } from "@/redux/features/cart/cartHooks";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const COIN_MIN_AMOUNT = 750;
const CustomBundleSchema = z.object({
  amount: z.coerce
    .number<string>({ error: "Coin amount must be a valid number" })
    .min(
      COIN_MIN_AMOUNT,
      `You must purchase at least ${COIN_MIN_AMOUNT} coins.`,
    ),
});

export default function CustomBundle() {
  const { data, isLoading, isSuccess } = useGetCustomCoinBundleQuery();
  const { onBuyCustomCoinBundle } = useAppCart();
  const isAvailable = isSuccess && !!data;

  const calculateCoinPrice = (coin_amount: string) => {
    if (!data) return 0;

    const basePrice = Number(data.price);
    const baseAmount = Number(data.coin_amount);
    const amount = Number(coin_amount);

    if (!basePrice || !baseAmount) return 0;
    if (!amount || amount < COIN_MIN_AMOUNT) return 0;

    const singleCoinPrice = basePrice / baseAmount;

    return Number((amount * singleCoinPrice).toFixed(2));
  };

  const form = useForm({
    defaultValues: {
      amount: "",
    },
    validators: {
      onSubmit: CustomBundleSchema,
    },
    onSubmit: async ({ value }) => {
      if (!data) {
        toast.error(
          "Custom bundles are temporarily unavailable. Please check back soon.",
        );
        return;
      }

      const coinPrice = calculateCoinPrice(value.amount);
      await onBuyCustomCoinBundle({
        ...data,
        coin_amount: parseInt(value.amount),
        price: coinPrice,
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="amount">
          {(field) => {
            const coinTotalPrice = calculateCoinPrice(field.state.value);

            const coinAmount = Number(field.state.value);

            const isEmpty = !field.state.value || coinAmount === 0;
            const isBelowMin = coinAmount > 0 && coinAmount < COIN_MIN_AMOUNT;
            const isValid = coinAmount >= COIN_MIN_AMOUNT;

            return (
              <>
                <Field>
                  <Label htmlFor="amount-input">Number of Coins</Label>
                  <InputGroup
                    className={cn(
                      inputStyles,
                      "bg-primary-100 border-primary-100 text-heading-100 px-1",
                    )}
                  >
                    <InputGroupAddon
                      align="inline-end"
                      className="text-heading-100"
                    >
                      {isLoading ? <Spinner className="size-4" /> : null}
                    </InputGroupAddon>
                    <InputGroupInput
                      disabled={isLoading}
                      id="amount-input"
                      name="amount-input"
                      type="number"
                      placeholder={`Enter at least ${COIN_MIN_AMOUNT} coins`}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </InputGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>

                <div className="bg-primary-100 mt-4 grid min-h-52 w-full place-items-center rounded-xl p-8 text-center">
                  {!isAvailable ? (
                    <p className="text-destructive mt-2 text-base">
                      Custom bundles are temporarily unavailable. Please check
                      back soon.
                    </p>
                  ) : (
                    <>
                      {isEmpty && (
                        <p className="text-destructive mt-2 text-base">
                          Please enter a coin amount *
                        </p>
                      )}

                      {isBelowMin && (
                        <p className="text-destructive mt-2 text-base">
                          You must purchase at least{" "}
                          {COIN_MIN_AMOUNT.toLocaleString()} coins.
                        </p>
                      )}

                      {isValid && (
                        <div className="bg-primary-100 mt-4 w-full rounded-xl p-8 text-center">
                          <p className="text-lg text-gray-600">
                            Estimated bundle price
                          </p>
                          <p className="text-3xl font-semibold">
                            <span className="text-primary">
                              ${coinTotalPrice.toLocaleString()}
                            </span>
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* <p className="text-2xl font-semibold"> */}
                  {/*   Your bundle price is */}
                  {/*   <span className="text-primary">{` $${coinTotalPrice.toLocaleString()}`}</span> */}
                  {/* </p> */}
                </div>
              </>
            );
          }}
        </form.Field>

        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isValid,
            state.isTouched,
          ]}
        >
          {([canSubmit, isSubmitting, isValid, isTouched]) => (
            <Button
              disabled={
                !isAvailable ||
                isLoading ||
                !isTouched ||
                !isValid ||
                !canSubmit ||
                isSubmitting
              }
              type="submit"
              variant="primary"
              className="mt-8 w-full"
            >
              Buy now
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
