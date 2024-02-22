const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

mongoose.set("strictQuery", false);
// dataBase Connection
mongoose
  .connect(
    "mongodb+srv://namrata1677:k67gd4kQs6x1hklW@cluster0.9nfnd5k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// schema User

const userSchema = new mongoose.Schema({
  phone: String,
  password: String,
  cart: [Array],
  wishList: [String],
  email: String,
  orders: [String],
  name: String,
  sum: Number,
});

const orderSchema = new mongoose.Schema({
  productId: String,
  userId: String,
  size: String,
  qty: Number,
  name: String,
  postalCode: String,
  city: String,
  address: String,
  phone: String,
  date: { type: Date, default: Date.now },
  price: Number,
  img: String,
  title: String,
  orderStatus: { type: Boolean, default: false },
});

// schema Product
const productSchema = new mongoose.Schema({
  type: String,
  desc: String,
  color: [String],
  title: String,
  img: [String],
  price: [Number],
});

const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

const userAdder = async ({ phone, email, name }) => {
  const newUser = await User.create({
    phone: phone,
    email: email,
    name: name,
    cart: [],
  });
  console.log(newUser);
};
const productAdder = async ({ type, desc, img, title, price }) => {
  const newProduct = await Product.create({
    type: type,
    desc: desc,
    color: ["red", "black"],
    title: title,
    price: price,
    img: img,
  });
  console.log(newProduct);
};

module.exports = { User, Product, mongoose, productAdder, userAdder, Order };
