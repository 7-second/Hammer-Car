import mongoose from "mongoose";

const Transmission = {
  Auto: "Auto",
  Manual: "Manual",
};

const CarType = {
  Rent: "rent",
  Sell: "sell",
};

const CarModel = {
  Corolla: "Corolla",
  Yaris: "Yaris",
  Vitz: "Vitz",
  Hilux: "Hilux",
  LandCruiser: "LandCruiser",
  Rav4: "Rav4",
  Camry: "Camry",
  HyundaiAccent: "HyundaiAccent",
  HyundaiSanta: "HyundaiSanta",
  Dzire: "Dzire",
  Swift: "Swift",
  Alto: "Alto",
  Sunny: "Sunny",
  Patrol: "Patrol",
  Navara: "Navara",
  XTrail: "XTrail",
  Fit: "Fit",
  Civic: "Civic",
  Lancer: "Lancer",
  Pajero: "Pajero",
  Outlander: "Outlander",
  Jetta: "Jetta",
  Passat: "Passat",
  Golf: "Golf",
};

const Engine = {
  Diesel: "Diesel",
  Petrol: "Petrol",
  Electric: "Electric",
  Gas: "Gas",
};

const carSchema = new mongoose.Schema(
  {
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    carBrand: {
      type: String,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
      enum: Object.values(CarModel),
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(CarType),
    },
    engine: {
      type: String,
      required: true,
      enum: Object.values(Engine),
    },
    price: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    fuelCapacity: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
      enum: Object.values(Transmission),
    },
    location: {
      type: String,
    },
    fuelCapacity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
  },
  { timestamps: true }
);

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
