import mongoose from "mongoose";

const rentSchema = new mongoose.Schema(
    {
        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car"
        },
        rentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        // pickUp: {
        //     type: String,
        // },
        // dropOff: {
        //     type: String,
        // },
        from: {
            type: Date,
        },
        to: {
            type: Date,
        },
    },
    { timestamps: true }
);

const Rent = mongoose.models.Rent || mongoose.model("Rent", rentSchema);

export default Rent;