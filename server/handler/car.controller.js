import Car from "../model/car.model.js";
import User from "../model/user.model.js";
import Image from "../model/image.model.js";



// Get all cars
export const cars = async (req, res) => {
  try {
    const { userType, organizationId, carType } = req.query;

    // Validate organizationId for organization requests
    if (userType === "organization" && !organizationId) {
      return res.status(400).json({ message: "Organization ID is missing" });
    }

    let filter = {};

    // Filter cars owned by the organization
    if (userType === "organization") {
      filter.owner = organizationId; // Filter by organization ID
    }

    // Filter by carType if specified (e.g., "sale" or "rent")
    if (carType) {
      filter.carType = carType;
    }

    // Populate owner details in cars
    const cars = await Car.find(filter).populate('owner').populate("images"); // Populate owner details

    if (!cars.length) {
      return res.status(404).json({ message: "No cars found matching the criteria" });
    }

    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Failed to fetch cars" });
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
    // Populate the 'owner' field for this specific car
    const car = await Car.findById(id).populate('owner');
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
    owner, CC, carModel, carType, price, peopleCapacity, transmission,
    carBrand, engine, fuelCapacity, location, description, year,
  } = req.body;

  const images = req.files?.map((file) => file.originalname); // Handle cases where `req.files` might be undefined

  // Validate required fields
  if (
    !CC || !carModel || !carType || !price || !peopleCapacity || !transmission ||
    !carBrand || !engine || !fuelCapacity || !location || !description ||
    !images?.length || !year
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
      owner,
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
      images: imageIds,
    });

    await newCar.save();

    const user = await User.findById(owner);

    if (!user) {
      return res.status(404).json({ error: "Owner not found" });
    }

    // Ensure user.cars is initialized as an array before pushing the new car
    if (!Array.isArray(user.cars)) {
      user.cars = []; // Initialize if it's undefined or not an array
    }

    user.cars.push(newCar._id);
    await user.save();

    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error("Error adding car:", error);
    next(error); // Pass the error to the error handler
  }
};


export const deleteCar = async (req, res) => {
  const carId = req.params.id; // Get car ID from request params

  try {
    // Try to find and delete the car by ID
    const car = await Car.findByIdAndDelete(carId);

    // If car not found, return a 404 response
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    // Successfully deleted, return success message
    res.status(200).json({ message: "Car deleted successfully." });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Failed to delete car." });
  }
};

