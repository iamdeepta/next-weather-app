"use client";

import { useEffect, useState } from "react";

interface ICustomer {
  id: number;
  name: string;
  phone: string;
  city: string;
  temperature?: number;
}

const CustomerTable = ({ customers }: { customers: ICustomer[] }) => {
  const [customersWithWeather, setCustomersWithWeather] =
    useState<ICustomer[]>(customers);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const getTemperature = async () => {
    const customersMain = [];

    for (let i = 0; i < customers?.length; i++) {
      const tempData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${customers[i]?.city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      const result = await tempData.json();

      customersMain.push({ ...customers[i], temperature: result?.main?.temp });
    }

    setCustomersWithWeather(customersMain);
  };

  useEffect(() => {
    getTemperature();
  }, []);

  const search = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm === "") {
      getTemperature();
      return;
    }
    const filterBySearch = customersWithWeather.filter((item: ICustomer) => {
      if (
        item?.name
          ?.trim()
          ?.toLowerCase()
          .includes(searchTerm?.trim()?.toLowerCase())
      ) {
        return item;
      }
    });
    setCustomersWithWeather(filterBySearch);
  }, [searchTerm]);

  return (
    <div>
      <input
        placeholder="Search"
        className="bg-[transparent] mb-4 border-2 rounded p-2"
        onChange={(e) => search(e)}
      />
      <table className="border-collapse border border-slate-500">
        <thead>
          <tr className="">
            <th className="border border-slate-600 p-3">Name</th>
            <th className="border border-slate-600 p-3">Phone</th>
            <th className="border border-slate-600 p-3">City</th>
            <th className="border border-slate-600 p-3">Temperature</th>
          </tr>
        </thead>

        <tbody>
          {customersWithWeather?.map((item: ICustomer) => {
            return (
              <tr key={item?.id}>
                <td className="border border-slate-600 p-3">{item?.name}</td>
                <td className="border border-slate-600 p-3">{item?.phone}</td>
                <td className="border border-slate-600 p-3">{item?.city}</td>
                <td className="border border-slate-600 p-3">
                  {item?.temperature}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
