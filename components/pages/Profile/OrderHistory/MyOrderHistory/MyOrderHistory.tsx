"use client";
import OrderTable, { getData } from "../../../../shared/OrderTable/OrderTable";

export default function MyOrderHistory() {
  const data = getData();
  return <OrderTable title="Order History" data={data} />;
}
