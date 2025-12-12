import { CheckMarkBadge } from "@/components/shared/icons/CheckMark";

const messages = [
  "Check your email for your unique redemption codes.",
  "Open the Sugo Chat app and navigate to Settings → Redeem Code.",
  "Enter your code to activate your purchase.",
];

export default function SecurePaymentMsg() {
  return (
    <div className="bg-card/50 mt-4 flex max-w-2xl flex-col gap-2 rounded-xl p-4">
      <p className="text-heading-100 text-base font-medium">Secure Payment</p>

      <ul className="space-y-1">
        {messages.map((item, index) => (
          <li key={index} className="flex gap-2">
            <CheckMarkBadge className='mt-1.5' />
            <p className="text-body-200 text-base">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
