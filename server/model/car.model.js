import mongoose from "mongoose";

// Enum definitions for clarity and reusability
const Transmission = {
  Auto: "Auto",
  Manual: "Manual",
};

const carType = {
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

const engine = {
  Diesel: "Diesel",
  Petrol: "Petrol",
  Electric: "Electric",
  Gas: "Gas",
};

// Schema definition
const carSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    CC :{
     type:Number ,
     required:true
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
    carType: {
      type: String,
      required: true,
      enum: Object.values(carType),
    },
    engine: {
      type: String,
      required: true,
      enum: Object.values(engine),
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
      required: true,
    },
    description: {
      type: String,
      required: true,
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

// Exporting the model
const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;