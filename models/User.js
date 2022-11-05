const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      
    },
    last_name: {
      type: String,
      required: true,
      
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'User already registered']
    },
    password: {
      type: String,
      required:true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    
  },
  { timestamps: true }
);

// The code in the UserScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.
UserSchema.pre(
  'save',
  async function (next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);

      this.password = hash;
      next();
  }
);

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}


 

//module.exports = mongoose.model('users', UserSchema);

const User = mongoose.model('User', UserSchema);

module.exports = User;





