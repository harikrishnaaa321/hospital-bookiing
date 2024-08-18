import React from "react";
import { formateDate } from "../../components/utils/formateDate";

const Appointments = ({ appointments }) => {
  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Gender
          </th>
          <th scope="col" className="px-6 py-3">
            Payment Status
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Booked on
          </th>
        </tr>
      </thead>
      <tbody>
        {appointments?.map((item) => (
          <tr key={item._id}>
            <th
              scope="row"
              className="flex items-center px-6 py-4 text-gray-800 whitespace-nowrap"
            >
              <img
                src={item.user.photo}
                alt={`${item.user.name}'s photo`}
                className="w-10 h-10 rounded-full"
              />
              <div className="pl-3">
                <div className="text-base font-semibold">{item.user.name}</div>
                <div className="text-normal text-gray-400">
                  {item.user.email}
                </div>
              </div>
            </th>
            <td className="px-6 py-4">{item.user.gender}</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div
                  className={`h-2.5 w-2.5 rounded-full mr-2 ${
                    item.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                {item.isPaid ? "Paid" : "Unpaid"}
              </div>
            </td>
            <td className="px-6 py-4">{item.ticketPrice}</td>
            <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;
