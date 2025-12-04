import Image from "next/image";

interface CheckoutStatusProps {
  isSuccess?: boolean;
  title: string;
  message: string;
}

export default function CheckoutStatus({
  isSuccess,
  title,
  message,
}: CheckoutStatusProps) {
  return (
    <div className="flex flex-col items-center">
      {isSuccess ? (
        <Image width={120} height={120} alt="" src="/images/sign-success.png" />
      ) : (
        <Image width={120} height={120} alt="" src="/images/sign-failed.png" />
      )}

      <h3 className="text-heading-200 font-heading mt-8 text-center text-3xl font-semibold">
        {title}
      </h3>
      <p className="mt-3 text-center">{message}</p>
    </div>
  );
}
