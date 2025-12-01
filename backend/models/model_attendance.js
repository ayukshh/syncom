import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent", "late", "leave"],
      default: "present",
    },

    checkIn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevents from creating multiple attendance records on the same day
attendanceSchema.index(
  { user: 1, checkIn: 1 },
  { unique: true }
);

export default mongoose.model("Attendance", attendanceSchema);
