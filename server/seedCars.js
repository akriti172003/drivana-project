import mongoose from 'mongoose';
import Car from './models/car.js'; 
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

const carData = [
  { brand: "Maruti Suzuki", models: ["Swift", "Baleno", "Brezza", "Grand Vitara"], type: "Middle Class" },
  { brand: "Tata", models: ["Nexon", "Harrier", "Safari", "Punch"], type: "Middle Class" },
  { brand: "Hyundai", models: ["Creta", "Verna", "i20", "Alcazar"], type: "Middle Class" },
  { brand: "Toyota", models: ["Fortuner", "Innova Hycross", "Camry"], type: "Upper Class" },
  { brand: "Mahindra", models: ["XUV700", "Scorpio-N", "Thar"], type: "Upper Class" },
  { brand: "BMW", models: ["M4", "X5", "3 Series"], type: "Luxury" },
  { brand: "Mercedes", models: ["G-Wagon", "S-Class", "GLC"], type: "Luxury" },
  { brand: "Lamborghini", models: ["Urus", "Huracan"], type: "Supercar" }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Car.deleteMany({}); 

    const bulkCars = [];

    for (let i = 0; i < 80; i++) {
      const category = faker.helpers.arrayElement(carData);
      const modelName = faker.helpers.arrayElement(category.models);
      
      // 🖼️ THE KEY FIX: 
      // Using loremflickr with a 'lock' based on 'i'. 
      // This forces the service to provide a unique car image for every loop.
      const imageUrl = `https://loremflickr.com/800/600/car,automobile?lock=${i}`;

      bulkCars.push({
        name: `${category.brand} ${modelName}`,
        brand: category.brand,
        price: category.type === "Supercar" ? 38000000 : 1500000,
        fuelType: faker.helpers.arrayElement(["Petrol", "Diesel", "EV"]),
        transmission: "Automatic",
        bhp: faker.number.int({ min: 100, max: 600 }),
        torque: faker.number.int({ min: 150, max: 700 }),
        safetyRating: "5 Star",
        mileage: "18 kmpl",
        seating: 5,
        topSpeed: "210 km/h",
        image: imageUrl,
        description: `Premium ${category.brand} ${modelName}.`
      });
    }

    await Car.insertMany(bulkCars);
    console.log("🚀 SUCCESS: Unique car images generated!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();