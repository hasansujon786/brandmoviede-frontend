import { FAQ } from "@/components/pages/Bundles/FAQ";
import Shop from "@/components/pages/Home/Shop";

export default function CoinBundlesPage() {
  return (
    <div>
      {/* TODO: show paginations */}
      <div className="bg-card">
        <Shop />
      </div>
      <FAQ />
    </div>
  );
}
