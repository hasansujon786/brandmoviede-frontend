import BundleDetails from "@/components/pages/BundleDetails/BundleDetails";
import NavigationLink from "@/components/shared/NavigationLink/NavigationLink";

export default function BundlePageDetailsPage() {
  return (
    <div>
      <div className="custom-container py-20">
        <NavigationLink href="/bundles">Coin Bundle / Bundle Details</NavigationLink>

        <div className="mt-8">
          <BundleDetails />
        </div>
      </div>
    </div>
  );
}
