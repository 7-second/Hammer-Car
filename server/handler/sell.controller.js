import Car from "../model/car.model.js";
import Sell from "../model/sell.model.js";
import User from "../model/user.model.js"

export const sells = async (_, res, next) => {
  try {
    const respone = await Car.find({ type: "sell" }).populate("images");
    res.status(200).json(respone);
  } catch (error) {
    next(error);
  }
};

export const sellCar = async (req, res, next) => {
  try {
    const { carId, buyerId } = req.body;

    const buy = await Sell.create({
      car: carId,
      selldBy: buyerId,
    });

    const updateUser = await User.findById({ _id: buyerId });

    if (buy && updateUser) {
      updateUser?.sell?.push(buy?._id); 
      await updateUser.save();
    }
    res.status(201).json("Buy success");
  } catch (error) {
    next(error);
  }
};
