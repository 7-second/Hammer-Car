import React from "react";
import { Rating } from "@mui/material";
import { Card, CardContent, Typography, CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const MechanicCard = ({ mechanics }) => {
  const randomRating = Math.floor(Math.random() * 5) + 1;

  return (
    <>
      <div className="shadow-lg">
        <div className="rounded-lg">
          <img
            src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg"
            alt=""
            className=" w-full px-3 pt-3  h-40 overflow-hidden   object-cover"
          />
        </div>
        <div className="px-3 py-2 flex flex-col gap-2">
          <h2 className="font-serif">biniyam</h2>
          <h3 >
            <Rating
            className=""
             size="small"
            name="read-only" value={randomRating} readOnly />             
          </h3>
            <p className="text-sm w-[300px]">Addis Ababa, Ethiopia dajbajbdjabajbjaabcna
                acjabckabckasnckanckac
                axkanckanckancaknckan
            </p>
            <h1 className="font-sans bg-slate-300 rounded-md w-fit px-2"> Avaliable Time               
            </h1>
            <ul className="flex flex-row gap-3 opacity-80 font-bold text-sm">
                    <li>2:10pm</li>
                    <li>2:10pm</li>
                    <li>2:10pm</li>
                </ul>
        </div>
        <div className="py-1 px-2 flex justify-end">
            <button className="bg-blue-600 hover:bg-purple-600 focus:bg-slate-400 rounded-md px-2 text-white font-sans">
                <Link to="/mechdetail">More</Link>
                </button>
        </div>
      </div>
    </>
  );
};

export default MechanicCard;
