import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface OrdersProps {
  orders: any[];
}

function Orders(props: OrdersProps) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [orderLoading, setOrderLoading] = useState(true);
  const { user, loading }: any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/orders/all-orders");
  }, []);
  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="My Orders" />
        <div className="w-full h-full">
          {/* <OrdersTable loading={orderLoading} orders={orders} /> */}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Orders;
