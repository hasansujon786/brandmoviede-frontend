import SecurityCard from "@/components/pages/Dashboard/Settings/SecurityCard";
import ProfileSettings from "@/components/pages/Profile/ProfileSettings/ProfileSettings";

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-4">
      <ProfileSettings />
      <SecurityCard />
    </div>
  );
}
