import BundleDetails, {
  ShowBackButton,
} from "@/components/pages/BundleDetails/BundleDetails";

export default function BundlePageDetailsPage() {
  return (
    <div>
      <div className="custom-container py-10 lg:py-20">
        <ShowBackButton />

        <div className="mt-8">
          <BundleDetails />
        </div>
      </div>
    </div>
  );
}
