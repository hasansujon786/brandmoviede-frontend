import SecurityCard from "@/components/pages/Dashboard/Settings/SecurityCard";
import ProfileSettings from "@/components/pages/Profile/ProfileSettings/ProfileSettings";

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-4 p-5">
      <ProfileSettings />
      <SecurityCard />
      {/* <PlatformPreferencesCard /> */}
      {/* <section className="flex items-center justify-end gap-4"> */}
      {/*   <Button size="lg" variant="primary-inverse"> */}
      {/*     Cancel */}
      {/*   </Button> */}
      {/*   <Button size="lg" variant="primary"> */}
      {/*     Save Changes */}
      {/*   </Button> */}
      {/* </section> */}
    </div>
  );
}
