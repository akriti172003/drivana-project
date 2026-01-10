const mongoose = require("mongoose");
require("dotenv").config();

const Car = require("./models/Car");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error(err));

const cars = [
  {
    name: "Creta",
    brand: "Hyundai",
    image: "creta.jpg",
    price: "12 Lakh",
    engine: "1497 cc",
    power: "113 bhp",
    torque: "143.8 Nm",
    mileage: "17 kmpl",
    fuel: "Petrol",
    safety: "5 Star",
    seats: 5
  },
  {
    name: "Harrier",
    brand: "Tata",
    image: "harrier.jpg",
    price: "15 Lakh",
    engine: "1956 cc",
    power: "167 bhp",
    torque: "350 Nm",
    mileage: "16 kmpl",
    fuel: "Diesel",
    safety: "5 Star",
    seats: 5
  },
  {
    name: "Nexon",
    brand: "Tata",
    image: "nexon.jpg",
    price: "9 Lakh",
    engine: "1497 cc",
    power: "118 bhp",
    torque: "260 Nm",
    mileage: "17 kmpl",
    fuel: "Petrol",
    safety: "5 Star",
    seats: 5
  },
  {
    name: "City",
    brand: "Honda",
    image: "city.jpg",
    price: "11 Lakh",
    engine: "1498 cc",
    power: "119 bhp",
    torque: "145 Nm",
    mileage: "18 kmpl",
    fuel: "Petrol",
    safety: "5 Star",
    seats: 5
  },
  {
    name: "Swift",
    brand: "Maruti",
    image: "swift.jpg",
    price: "6 Lakh",
    engine: "1197 cc",
    power: "89 bhp",
    torque: "113 Nm",
    mileage: "22 kmpl",
    fuel: "Petrol",
    safety: "2 Star",
    seats: 5
  },
  {
    name: "Seltos",
    brand: "Kia",
    image: "seltos.jpg",
    price: "11 Lakh",
    engine: "1497 cc",
    power: "113 bhp",
    torque: "144 Nm",
    mileage: "17 kmpl",
    fuel: "Petrol",
    safety: "3 Star",
    seats: 5
  },
  {
    name: "Fortuner",
    brand: "Toyota",
    image: "fortuner.jpg",
    price: "33 Lakh",
    engine: "2755 cc",
    power: "201 bhp",
    torque: "420 Nm",
    mileage: "14 kmpl",
    fuel: "Diesel",
    safety: "5 Star",
    seats: 7
  },
  {
    name: "Thar",
    brand: "Mahindra",
    image: "thar.jpg",
    price: "14 Lakh",
    engine: "2184 cc",
    power: "130 bhp",
    torque: "300 Nm",
    mileage: "15 kmpl",
    fuel: "Diesel",
    safety: "4 Star",
    seats: 4
  },
  {
    name: "Verna",
    brand: "Hyundai",
    image: "verna.jpg",
    price: "10 Lakh",
    engine: "1497 cc",
    power: "113 bhp",
    torque: "143 Nm",
    mileage: "18 kmpl",
    fuel: "Petrol",
    safety: "5 Star",
    seats: 5
  },
  {
    name: "XUV700",
    brand: "Mahindra",
    image: "xuv700.jpg",
    price: "17 Lakh",
    engine: "1999 cc",
    power: "197 bhp",
    torque: "380 Nm",
    mileage: "15 kmpl",
    fuel: "Petrol",
    safety: "5 Star",
    seats: 7
  }
];

async function seed() {
  try {
    await Car.deleteMany({});
    console.log("Old cars removed.");

    await Car.insertMany(cars);
    console.log("Cars added successfully!");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

seed();
