import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateCoinBundleDialog({
  children,
}: React.PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-card sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Coin Bundle</DialogTitle>
          <DialogDescription>
            Create a new coin bundle for the store.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-5">
          {/* Basic Info */}
          <Field>
            <Label htmlFor="name">Bundle Name</Label>
            <Input id="name" name="name" placeholder="Enter a name for your Coin Bundle" />
          </Field>

          {/* Coins */}
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <Label htmlFor="coins">Coin Amount</Label>
              <Input
                id="coins"
                name="coins"
                type="number"
                placeholder="Ex: 17000"
              />
            </Field>

            <Field>
              <Label htmlFor="bonusCoins">Bonus Coins</Label>
              <Input
                id="bonusCoins"
                name="bonusCoins"
                type="number"
                placeholder="Ex: 850"
              />
            </Field>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" placeholder="Ex: 10" />
            </Field>

            <Field>
              <Label htmlFor="currency">Currency</Label>
              <Select name="currency" defaultValue="EUR">
                <SelectTrigger className="h-14! w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          {/* Image */}
          <Field>
            <Label htmlFor="image">Bundle Image URL</Label>
            <Input id="image" name="image" placeholder="https://..." />
          </Field>

          {/* Marketing */}
          <Field>
            <Label htmlFor="includes">What&apos;s Included</Label>
            <Input
              id="includes"
              name="includes"
              placeholder="Ex: Instant delivery, Never expires, 5% bonus coins"
            />
          </Field>

          <Field>
            <Label htmlFor="perfectFor">Perfect For</Label>
            <Input
              id="perfectFor"
              name="perfectFor"
              placeholder="Ex: Premium access, Events, Themes"
            />
          </Field>

          {/* Status */}
          <div className="flex items-center gap-3">
            <Checkbox id="active" name="active" defaultChecked />
            <Label htmlFor="active">Active bundle</Label>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button size="lg" variant="primary-inverse">
                Cancel
              </Button>
            </DialogClose>
            <Button size="lg" variant="primary" type="submit">
              Create Bundle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
