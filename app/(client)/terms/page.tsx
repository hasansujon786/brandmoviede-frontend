import SectionHeading from "../../../components/shared/SectionHeading/SectionHeading";
import LegalDocument from "../../../components/shared/LegalDocument/LegalDocument";
import privacyData from "../privacy/privacy.json";

export default function PrivacyPage() {
  return (
    <div className="custom-container w-full py-20">
      <SectionHeading eyebrow="LEGAL POLICIES" h2>
        Terms & Conditions
      </SectionHeading>
      <LegalDocument data={privacyData.terms_and_conditions} />
    </div>
  );
}

export const metadata = {
  title: "Terms & Conditions | Sugo Coin",
  description: "Official Terms & Conditions for Sugo Coin",
};
