import Car from "../model/car.model.js";
import User from "../model/user.model.js";
import Image from "../model/image.model.js"

// export const cars = async (_, res, next) => {
//   try {
//     const cars = await Car.find()?.populate("images");
//     res.status(200).json(cars);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getCar = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const cars = await Car.findById({ _id: id })?.populate("images");
//     res.status(200).json(cars);
//   } catch (error) {
//     next(error);
//   }
// };


export const cars = async (_, res, next) => {
 
  try {
      const cars = await Car.find()?.populate("images");
      res.status(200).json(cars)
  } catch (error) {
      next(error)
  }
}

export const getCar = async (req, res, next) => {
  const { id } = req.params;

  try {
    const car = await Car.findById(id).populate("images"); // Use 'car' instead of 'cars'

    if (!car) {
      return res.status(404).json({ message: 'Car not found' }); 
    }

    res.status(200).json(car); 
  } catch (error) {
    next(error);
  }
};


export const updateCar = async (req, res, next) => {
  const { id, owner } = req.params;

  try {
    if (id === "undefined") {
      next("Invalid ID for update profile");
    }

    const car = await Car.findById({ _id: id });

    if (car.owner.toString() !== owner) {
      return res.status(400).json({
        success: false,
        message: "You are not allowed to edit this car. You are not the owner",
      });
    } else {
      await Car.updateOne({ _id: id }, req.body);

      res.status(200).json("Update Successfully");
    }
  } catch (error) {
    console.log(error, "User update error");
    next(error);
  }
};
export const addCar = async (req, res, next) => {
  const {
    owner,
    carModel,
    carType,
    price,
    peopleCapacity,
    transmission,
    carBrand,
    engine,
    fuelCapacity,
    location,
    description,
    year,
  } = req.body;
  const images = req.files.map((file) => file.originalname);

  if (
    !carModel ||
    !carType ||
    !price ||
    !peopleCapacity ||
    !transmission ||
    !carBrand ||
    !engine ||
    !fuelCapacity ||
    !location ||
    !description ||
    !images ||
    !year
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const imageIds = [];
  for (const file of req.files) {
    const newImage = await Image.create({ url: file.path });
    imageIds.push(newImage._id);
  }

  try {
    const newCar = new Car({
      owner,
      carModel,
      carType,
      price,
      peopleCapacity,
      transmission,
      carBrand,
      engine,
      fuelCapacity,
      location,
      description,
      images: imageIds, // Use imageIds instead of images
      year,
    });

    await newCar.save();

    const user = await User.findById(owner);

    if (!user) {
      return next("Invalid owner");
    }

    user.cars.push(newCar._id);
    await user.save();

    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error(error, "Error adding car..");
    res.status(500).json({ error: "Error adding car" });
  }
};

//   const user = await User.findById(owner);

//   if (!user) {
//     return next("Invalid owner");
//   }

//   user?.cars?.push(newCar._id);
//   await user.save();
