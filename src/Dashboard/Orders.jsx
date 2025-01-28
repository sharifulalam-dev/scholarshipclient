import React, { useState } from "react";

export default function Orders() {
  const orders = [
    {
      id: "#2632",
      name: "Brooklyn Zoe",
      address: "302 Snider Street, RUTLAND, VT, 05701",
      date: "31 Jul 2020",
      price: "$64.00",
      status: "Pending",
    },
    {
      id: "#2633",
      name: "John McCormick",
      address: "1096 Wiseman Street, CALMAR, IA, 52132",
      date: "01 Aug 2020",
      price: "$35.00",
      status: "Dispatch",
    },
    {
      id: "#2634",
      name: "Sandra Pugh",
      address: "1640 Thorn Street, SALE CITY, GA, 98106",
      date: "02 Aug 2020",
      price: "$74.00",
      status: "Completed",
    },
    {
      id: "#2635",
      name: "Vernie Hart",
      address: "3888 Oak Drive, DOVER, DE, 19906",
      date: "02 Aug 2020",
      price: "$82.00",
      status: "Pending",
    },
    {
      id: "#2636",
      name: "Mark Clark",
      address: "1915 Augusta Park, NASSAU, NY, 12062",
      date: "03 Aug 2020",
      price: "$39.00",
      status: "Dispatch",
    },
    {
      id: "#2637",
      name: "Rebekah Foster",
      address: "3445 Park Boulevard, BIOLA, CA, 93606",
      date: "03 Aug 2020",
      price: "$67.00",
      status: "Pending",
    },
  ];
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Order</h1>
      <p className="text-gray-600 mb-6">{orders.length} orders found</p>

      <div className="mb-4 flex items-center space-x-4">
        <button className="text-blue-600 font-semibold border-b-2 border-blue-600">
          All orders
        </button>
        <button className="text-gray-600 hover:text-blue-600">Dispatch</button>
        <button className="text-gray-600 hover:text-blue-600">Pending</button>
        <button className="text-gray-600 hover:text-blue-600">Completed</button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left text-sm">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className={`hover:bg-blue-100 ${
                  selectedOrder?.id === order.id ? "bg-blue-200" : ""
                }`}
                onClick={() => handleRowClick(order)}
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.name}</td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">{order.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Pending"
                        ? "bg-red-100 text-red-600"
                        : order.status === "Dispatch"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-500 hover:text-blue-600">
                    ⚙️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {selectedOrder ? 1 : "1-6"} of {orders.length}
      </div>
    </>
  );
}
