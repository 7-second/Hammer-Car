import CountUp from "react-countup";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function DashBoard() {
  const [usercount, setUsercount] = useState(0);
  const [orgcount, setOrgcount] = useState(0);
  const [mechcount, setMechcount] = useState(0);
  const [car, setCar] = useState(0);
  const [rent, setRent] = useState(0);
  const [sell, setSell] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}user?role=user`);
        const org = await axios.get(`${import.meta.env.VITE_API_BASE_URL}user?role=organization`);
        const mech = await axios.get(`${import.meta.env.VITE_API_BASE_URL}user?role=mechanic`);
        const car = await axios.get(`${import.meta.env.VITE_API_BASE_URL}car`);

        const allCars = car?.data || [];
        const sellcar = allCars.filter((car) => car.carType === "sell");
        const rentcar = allCars.filter((car) => car.carType === "rent");

        setUsercount(response?.data.length);
        setOrgcount(org?.data.length);
        setMechcount(mech?.data.length);
        setCar(allCars.length);
        setRent(rentcar.length);
        setSell(sellcar.length);

      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col  md:gap-6 p-6 md:p-12">
      {/* For Larger Screens */}
      <div className="grid md:grid-cols-3 gap-6 w-full">
        {[
          { count: usercount, label: "Users", icon: "https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png" },
          { count: orgcount, label: "Organizations", icon: "https://cdn-icons-png.flaticon.com/512/3985/3985222.png" },
          { count: mechcount, label: "Mechanics", icon: "https://cdn-icons-png.freepik.com/512/15894/15894068.png" },
          { count: car, label: "Cars", icon: "https://www.svgrepo.com/show/280336/car.svg" },
          { count: rent, label: "Cars For Rent", icon: "https://cdn-icons-png.flaticon.com/512/8566/8566110.png" },
          { count: sell, label: "Cars For Sale", icon: "https://cdn-icons-png.flaticon.com/512/6428/6428512.png" },
        ].map((item, index) => (
          <div key={index} className="rounded-lg shadow-lg bg-white p-4 flex flex-col items-center justify-center gap-2 hover:shadow-xl transition-shadow duration-300">
            <img src={item.icon} alt={item.label} className="w-16 h-16" />
            <CountUp start={0} end={item.count} duration={2} className="text-xl font-bold text-green-600" />
            <h2 className="text-lg font-semibold">{item.label}</h2>
          </div>
        ))}
      </div>

      {/* For Smaller Screens */}
     
    </div>
  );
}

export default DashBoard;
