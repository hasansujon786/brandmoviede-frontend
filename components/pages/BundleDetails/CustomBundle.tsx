import { Button } from "@/components/ui/button";

export default function CustomBundle() {
  return (
    <div>
      <input
        className="text-heading-100 bg-primary-100 outline-ring h-14 w-full rounded-xl px-4 text-lg focus-visible:outline-2"
        type="text"
      />

      <div className="bg-primary-100 mt-4 w-full rounded-xl p-8 text-center">
        <p className="text-2xl font-semibold">You will Get</p>
        <p className="text-primary mt-4 text-3xl font-bold">1,320</p>
        <p className="text-base">Coins</p>
      </div>

      <Button variant="primary" className="mt-8 w-full">
        Add to Cart
      </Button>
    </div>
  );
}
