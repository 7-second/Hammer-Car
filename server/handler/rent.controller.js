import Rent from "../model/rent.model.js";
import User from "../model/user.model.js";
import Car from "../model/car.model.js";

export const rents = async (_, res, next) => {
    try{
        const response = await Car.find({type: "rent"}).populate("images")
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}


export const rentByCar = async (req, res, next) => {
    try {
        const { car, rentedBy, pickUp, dropOff, from, to } = req.body;

        const rent = await Rent.create({
            car,
            rentedBy,
            // pickUp,
            // dropOff,
            from,
            to
        });

        const updateUser = await User.findById({ _id: rentedBy });


        if (rent && updateUser) {
            updateUser?.rent?.push(rent?._id); // Push the new car's ID to the user's rent array
            await updateUser.save(); // Save the user document to update the database
        }
        res.status(201).json("Rented success")
    } catch (error) {
        next(error)
    }
}