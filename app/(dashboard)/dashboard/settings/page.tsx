import SecurityCard from "@/components/pages/Dashboard/Settings/SecurityCard";
import PlatformPreferencesCard from "@/components/pages/Dashboard/Settings/PlatformPreferencesCard";
import { Button } from "@/components/ui/button";

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-4 p-5">
      <PlatformPreferencesCard />
      <SecurityCard />

      <section className="flex items-center justify-end gap-4">
        <Button size="lg" variant="primary-inverse">
          Cancel
        </Button>
        <Button size="lg" variant="primary">
          Save Changes
        </Button>
      </section>
    </div>
  );
}
