import Sell from "../model/sell.modal.js";

export const sellCar = async (_, res, next) => {
    const { id } = req.params
    try {
        const cars = await Sell.find({selldBy:id})?.populate("images");
        res.status(200).json(cars)
    } catch (error) {
        next(error)
    }
}
