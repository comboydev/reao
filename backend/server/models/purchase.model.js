import mongoose from "mongoose";
const PurchaseSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Purchase", PurchaseSchema);
