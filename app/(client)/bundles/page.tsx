import { FAQ } from "@/components/pages/Bundles/FAQ";
import Shop from "@/components/pages/home/Shop";

export default function CoinBundlesPage() {
  return (
    <div>
      <div className="bg-card py-20">
        <Shop />
        {/* // TODO: show paginations */}
      </div>
      <div className="custom-container py-20">
        <FAQ />
      </div>
    </div>
  );
}
