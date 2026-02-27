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
import { z } from "zod";

const MIN_AMOUNT = 750;
const CustomBundleSchema = z.object({
  amount: z.coerce
    .number<string>({ error: "Amount must be a valid number" })
    .min(MIN_AMOUNT, `Minimum amount is $${MIN_AMOUNT}`),
});

export default function CustomBundle() {
  const { data, isLoading } = useGetCustomCoinBundleQuery();
  const { onBuyCustomCoinBundle } = useAppCart();

  const singleCoinPrice = data?.price ?? 0;
  const calculateCoinQuantity = (amount: string) => {
    if (!singleCoinPrice || Number(amount) < MIN_AMOUNT) return 0;
    return Math.floor(Number(amount) / singleCoinPrice);
  };

  const form = useForm({
    defaultValues: {
      amount: "",
    },
    validators: {
      onSubmit: CustomBundleSchema,
    },
    onSubmit: async ({ value }) => {
      if (!data) return;
      const coinQuantity = calculateCoinQuantity(value.amount);
      onBuyCustomCoinBundle({
        ...data,
        coin_amount: coinQuantity,
        price: parseInt(value.amount),
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
            const coinQuantity = calculateCoinQuantity(field.state.value);

            return (
              <>
                <Field>
                  <Label htmlFor="amount-input">Amount</Label>
                  <InputGroup
                    className={cn(
                      inputStyles,
                      "bg-primary-100 border-primary-100 text-heading-100 px-1",
                    )}
                  >
                    <InputGroupAddon className="text-heading-100">
                      {isLoading ? (
                        <Spinner className="size-4" />
                      ) : (
                        <div className="size-4">$</div>
                      )}
                    </InputGroupAddon>
                    <InputGroupInput
                      disabled={isLoading}
                      id="amount-input"
                      name="amount-input"
                      type="number"
                      placeholder={`Enter amount (min: $${MIN_AMOUNT})`}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </InputGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>

                <div className="bg-primary-100 mt-4 w-full rounded-xl p-8 text-center">
                  <p className="text-2xl font-semibold">You will Get</p>
                  <p className="text-primary mt-4 text-3xl font-bold">
                    {coinQuantity > 0 ? coinQuantity.toLocaleString() : "—"}
                  </p>
                  <p className="text-base">Coins</p>
                </div>
              </>
            );
          }}
        </form.Field>

        <Button type="submit" variant="primary" className="mt-8 w-full">
          Buy now
        </Button>
      </form>
    </div>
  );
}
