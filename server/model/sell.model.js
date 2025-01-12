import mongoose from "mongoose";

const sellSchema = new mongoose.Schema(
    {
        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car"
        },
        selldBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        
    },
    { timestamps: true }
);

const Sell = mongoose.models.Sell || mongoose.model("Sell", sellSchema);

export default Sell;