import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      validate: {
        validator: function(v) {
          // Check if phone contains only digits (no special characters allowed)
          const digitsOnlyRegex = /^\d+$/;
          if (!digitsOnlyRegex.test(v)) {
            return false;
          }
          
          // Check if exactly 10 digits
          if (v.length !== 10) {
            return false;
          }
          
          // Reject if all digits are the same (e.g., 1111111111)
          if (/^(\d)\1{9}$/.test(v)) {
            return false;
          }
          
          return true;
        },
        message: 'Phone number must be exactly 10 digits (no spaces, dashes, or country code)',
      },
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

