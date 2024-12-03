// components/Invoice.tsx
import { calculatePrice, formatNumber } from "@/utils/formatNumber";
import React from "react";

interface InvoiceProps {
  booking: any;
  patarideCut: any;
}

const InvoiceCard: React.FC<InvoiceProps> = ({ booking, patarideCut }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
      <div className="flex flex-col items-center justify-between mb-8">
        <div className="flex items-center">
          <img className="" src="/images/logo/PlowMart.png" alt="Logo" />
        </div>
        <div className="text-gray-700">
          <div className="font-bold text-xl mb-2">INVOICE</div>
          <div className="text-sm">
            Date:{" "}
            {new Date(booking.createdAt.seconds * 1000).toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </div>
          <div className="text-sm">Invoice #: {booking.uid}</div>
        </div>
      </div>
      <div className="border-b-2 border-gray-300 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
        <div className="text-gray-700 mb-2">{booking.fullName}</div>
        <div className="text-gray-700 mb-2">
          {`${booking.address_1}, ${booking.address_2}, ${booking.zipCode}`}
        </div>
        {/* <div className="text-gray-700 mb-2">{client.city}</div> */}
        <div className="text-gray-700">{booking.email}</div>
      </div>
      <table className="w-full text-left mb-8">
        <thead>
          <tr>
            {/* <th className="text-gray-700 font-bold uppercase py-2">
              Description
            </th> */}
            <th className="text-gray-700 font-bold uppercase py-2">
              Time period
            </th>
            {/* <th className="text-gray-700 font-bold uppercase py-2">Price</th>
            <th className="text-gray-700 font-bold uppercase py-2">Total</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-4 text-gray-700">{`${new Date(
              booking.selectedDates.startDate.seconds * 1000
            ).toLocaleDateString()} To ${new Date(
              booking.selectedDates.endDate.seconds * 1000
            ).toLocaleDateString()}`}</td>
            <td className="py-4 text-gray-700">{booking.rental.quantity}</td>
            {/* <td className="py-4 text-gray-700">
              Ksh{formatNumber(booking.rental.price)}
            </td>
            <td className="py-4 text-gray-700">
              Ksh{formatNumber(booking.rental.price)}
            </td> */}
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mb-8">
        <div className="text-gray-700 mr-2">Subtotal:</div>
        <div className="text-gray-700">
          Ksh
          {formatNumber(
            calculatePrice(
              booking.rental.price,
              booking.selectedDates.startDate,
              booking.selectedDates.endDate
            ) +
              calculatePrice(
                booking.rental.price,
                booking.selectedDates.startDate,
                booking.selectedDates.endDate
              ) *
                (patarideCut / 100)
          )}
        </div>
      </div>
      {/* <div className="flex justify-end mb-8">
        <div className="text-gray-700 mr-2">Plow-mart cut:</div>
        <div className="text-gray-700">Ksh{formatNumber(patarideCut)}</div>
      </div> */}
      <div className="flex justify-end mb-8">
        <div className="text-gray-700 mr-2">Total:</div>
        <div className="text-gray-700 font-bold text-xl">
          Ksh
          {formatNumber(
            calculatePrice(
              booking.rental.price,
              booking.selectedDates.startDate,
              booking.selectedDates.endDate
            ) +
              calculatePrice(
                booking.rental.price,
                booking.selectedDates.startDate,
                booking.selectedDates.endDate
              ) *
                (patarideCut / 100)
          )}
        </div>
      </div>
      <div className="border-t-2 border-gray-300 pt-8 mb-8">
        <div className="text-gray-700 mb-2">
          Payment is due within 30 days. Late payments are subject to fees.
        </div>
        <div className="text-gray-700 mb-2">
          Please make checks payable to Your Company Name and mail to:
        </div>
        <div className="text-gray-700">123 Main St., Anytown, USA 12345</div>
      </div>
    </div>
  );
};

export default InvoiceCard;
