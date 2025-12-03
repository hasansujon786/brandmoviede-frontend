import CustomBundle from "@/components/pages/bundleDetails/CustomBundle";
import NavigationLink from "@/components/shared/NavigationLink/NavigationLink";

export default function BundleCustomPage() {
  return (
    <div className="bg-white">
      <div className="custom-container py-20">
        <NavigationLink href="/bundles">Coin Bundles / Custom Coin Bundles</NavigationLink>

        <div className="mt-8">
          <CustomBundle />
        </div>
      </div>
    </div>
  );
}
