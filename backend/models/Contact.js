import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
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
          // Remove all non-digit characters for validation
          const digitsOnly = v.replace(/\D/g, '');
          
          // Check minimum length (at least 10 digits)
          if (digitsOnly.length < 10) {
            return false;
          }
          
          // Check maximum length (max 15 digits per E.164 standard)
          if (digitsOnly.length > 15) {
            return false;
          }
          
          // Check for valid characters only
          const validCharsRegex = /^[\d\s\-\+\(\)\.]+$/;
          if (!validCharsRegex.test(v)) {
            return false;
          }
          
          // Reject if all digits are the same
          if (/^(\d)\1{9,}$/.test(digitsOnly)) {
            return false;
          }
          
          return true;
        },
        message: 'Please enter a valid phone number (10-15 digits)',
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

