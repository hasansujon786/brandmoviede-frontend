"use client";

import OrderTable, { getData } from "../../../../shared/OrderTable/OrderTable";

export default function RecentOrders() {
  const data = getData();

  return <OrderTable shoPagination={false} title="Recent Orders" data={data.slice(0, 3)} />;
}
