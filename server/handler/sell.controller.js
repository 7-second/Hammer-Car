import Car from "../model/car.model.js";
import Sell from "../model/sell.model.js";

export const sells = async (_, res, next) => {
  try {
    const respone = await Car.find({ type: "sell" }).populate("images");
    res.status(200).json(respone);
  } catch (error) {
    next(error);
  }
};

export const sellCar = async (_, res, next) => {
  // const { id } = req.params
  try {
    const cars = await Sell.find();
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};
