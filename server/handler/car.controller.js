import Car from "../model/car.model.js";
import User from "../model/user.model.js";
import Image from "../model/image.model.js";

// Get all cars
export const cars = async (req, res, next) => {
  try {
    // Fetch all cars and populate both the 'images' and 'owner' fields
    const cars = await Car.find().populate('images').populate('owner'); // Populate the 'owner' field

    // Check if cars exist
    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No cars found" });
    }

    // Return the list of cars, now with owner and images populated
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error.message); // Log error for debugging
    next(error); // Pass error to the error-handling middleware
  }
};
// Get a car by ID

export const getCar = async (req, res, next) => {
  const { id } = req.params;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid car ID" });
  }

  try {
    const car = await Car.findById(id).populate('owner'); // Populate owner details for this specific car
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    next(error); // Pass errors to error handling middleware
  }
};

// Update a car
export const updateCar = async (req, res, next) => {
  const { id, owner } = req.params;

  try {
    if (!id || id === "undefined") {
      return next("Invalid ID for updating the car.");
    }

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.owner.toString() !== owner) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this car. You are not the owner.",
      });
    }

    await Car.updateOne({ _id: id }, req.body); // Consider using `findByIdAndUpdate` with validation

    res.status(200).json({ message: "Car updated successfully" });
  } catch (error) {
    console.error(error, "Car update error");
    next(error);
  }
};

// Add a new car
export const addCar = async (req, res, next) => {
  const {
    owner ,
    CC,
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

  const images = req.files?.map((file) => file.originalname); // Handle cases where `req.files` might be undefined

  // Validate required fields
  if (
    !CC,
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
    !images?.length || // Ensure images are provided
    !year
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const imageIds = [];
  try {
    for (const file of req.files) {
      const newImage = await Image.create({ url: file.path }); // Save image to database
      imageIds.push(newImage._id); // Store image ID
    }

    const newCar = new Car({
      owner ,
    CC,
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
    images:imageIds
    });

    await newCar.save();

    const user = await User.findById(owner);

    if (!user) {
      return res.status(404).json({ error: "Owner not found" });
    }

    user.cars.push(newCar._id);
    await user.save();

    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error("Error adding car:", error);
    next(error); // Pass the error to the error handler
  }
};
