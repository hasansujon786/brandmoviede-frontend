import { Button } from "@/components/ui/button";

export default function ShopCard() {
  return (
    <div className="bg-card rounded-[12px] p-2">
      <img
        src=""
        alt=""
        className="border-card aspect-square w-full rounded-lg border bg-gray-100"
      />
      <div className="mt-6 flex items-center justify-between">
        <div className="text-heading-100 text-2xl font-medium">€10 EUR</div>
        <div className="text-body-200 text-lg">17,000 coins</div>
      </div>
      <div className="mt-8 flex gap-3">
        <div className="flex w-30 items-center justify-center rounded-[10px] border">
          <span className="text-body-200 text-center text-2xl">1</span>
        </div>
        <Button variant="primary" className="flex-1">
          Buy Coins
        </Button>
      </div>
    </div>
  );
}
