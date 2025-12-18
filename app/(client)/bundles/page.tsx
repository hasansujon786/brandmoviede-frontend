import { FAQ } from "@/components/pages/Bundles/FAQ";
import Shop from "@/components/pages/Home/Shop";

export default function CoinBundlesPage() {
  return (
    <div>
      <div className="bg-card">
        <Shop showPagination />
      </div>
      <FAQ />
    </div>
  );
}
