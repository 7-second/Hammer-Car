import mongoose from "mongoose";

const Transmission = {
    Auto: "Auto",
    Manual: "Manual"
}

const carModel = {
    Corolla:"Corolla",
    Yaris:"Yaris",
    Vitz:"Vitz",
    Hilux:"Hilux",
    LandCruiser:"LandCruiser",
    Rav4:"Rav4",
    Camry:"Camry",
    HyundaiAccent:"HyundaiAccent",
    HyundaiSanta:"HyundaiSanta",
    Dzire:"Dzire",
    Swift:"Swift",
    Alto:"Alto",
    Sunny:"Sunny",
    Patrol:"Patrol",
    Navara:"Navara",
    XTrail:"XTrail",
    Fit:"Fit",
    Civic:"Civic",
    Fit:"Fit",
    Lancer:"Lancer",
    Pajero:"Pajero",
    Outlander:"Outlander",
    Jetta:"Jetta",
    Passat:"Passat",
    Golf:"Golf",
}

const CarBrand={
    Toyota:"Toyota",
    Hyundai:"Hyundai",
    Suzuki:"Suzuki",
    volkswagen:"Volswagen",
    Nissan:"Nissan",
    Byd:"Byd",
    Lifan:"Lifan",
    Jetour:"Jetour",
    Honda:"Honda",
    LandRover:"LandRover",
    SinoTruck:"SinoTruck",
    chery:"Chery",
    Mitsubishi:"Mitsubishi"
}

const Engine={
    Diesel:"Diesel",
    Petrol:"Petrol",
    Electric:"Electric",
    Gas:"Gas",
}

const Cartype = {
   sell: "sell",
   rent: "rent"

}



const carSchema = new mongoose.Schema(
    {
        // owner: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User"
        // },
        carTitle: {
            type: String,
            required: true,
        },

        cartype: {
            type: String,
            required: true,
            enum: Object.values(Cartype),
        },
        carModel: {
            type: String,
            required: true,
            enum: Object.values(carModel),
        },
        price: {
            type: Number,
            required: true,
        },
        peoplecapacity: {
            type: Number,
            required: true,
        },
        CarBrand:{
            type: String
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
        Year: {
            type:Number
        },
        Engine: {
            type:String
        },
        Cc: {
            type:String
        },

        images: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        }]
    },
    { timestamps: true }
);

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;