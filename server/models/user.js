import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const salt_rounds = 12;

const addressSchema = new mongoose.Schema({
  address_line_1: {
    type: String,
    required: [true, "address line one is required"],
    minlength: [3, "address line one must be at least 3 characters long"],
    maxlength: [100, "address line one must be at most 100 characters long"],
    match: [/^[a-zA-Z0-9\s\-]+$/, "allowing spaces, hyphens, and alphanumeric characters"]
  },
  city: {
    type: String,
    required: [true, "city is required"],
    minlength: [3, "city must be at least 3 characters long"],
    maxlength: [30, "city must be at most 30 characters long"],
  },
  state: {
    type: String,
    required: [true, "state is required"],
    minlength: [3, "state must be at least 3 characters long"],
    maxlength: [30, "state must be at most 30 characters long"],
  },
  country: {
    type: String,
    required: [true, "country is required"],
    minlength: [3, "country must be at least 3 characters long"],
    maxlength: [30, "country must be at most 30 characters long"],
  },
  pinCode: {
    type: Number,
    required: [true, "pincode is required"],
    validate: {
      validator: function (value) {
        return /^\d{6}$/.test(value);
      },
      message: "Invalid pincode. It must be a 6-digit number.",
    }
  }
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
      maxLength: [50, "name length cannot exceed 50 character"],
      minLength: [3, "name length should be greater than 3"],
      match: [/^[a-zA-Z\s]+$/, "name should only contain alphabets and spaces"]
    },
    email: {
      type: String,
      required: [true, "please enter Mail id"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?<![0-9!@#$%^&*(),.?":{}|<>])$/.test(value);
        },
        message: "Invalid email address format. Should start with an alphabetic character and follow the standard email format.",
      }
    },
    password: {
      type: String,
      required: [true, "please enter password"],
      minLength: [8, "password must be grater than 8 character"],
      validate: {
        validator: function (value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value);
        },
        message: "password must be 8 character long and must contains 1 lowercase, 1 uppercase and 1 special character"
      }
    },
    role: {
      type: String,
      default: "user",
    },
    address: {
      type: addressSchema,
    },
    phoneNo: {
      type: String,
      required: [true, "phone No is required"],
      validate: {
        validator: function (value) {
          return /^(\+\d{7,15}|\d{7,15})$/.test(value);
        },
        message: "Invalid phone number format. Should start with a plus sign (+) and be between 7 and 15 digits.",
      }
    },

  }, { timestamps: true });

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(salt_rounds);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  let update = this.getUpdate()
  if ('password' in update) {
    try {
      const salt = await bcrypt.genSalt(salt_rounds);
      update.password = await bcrypt.hash(update.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});


export const User = mongoose.model("user", UserSchema);

