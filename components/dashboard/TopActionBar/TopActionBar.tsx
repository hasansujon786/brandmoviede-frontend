import { PropsWithChildren } from "react";

export default function TopActionBar({ children }: PropsWithChildren) {
  return <section className="flex justify-end">{children}</section>;
}
