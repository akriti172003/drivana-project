import mongoose from 'mongoose';
import Car from './models/car.js';
import dotenv from 'dotenv';

dotenv.config();

const curatedImages = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0ad?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1562141982-c5c79ac8c5ad?auto=format&fit=crop&q=80&w=800"
];

const indianBrands = [
  { brand: "Maruti Suzuki", models: ["Alto K10", "Swift", "Brezza", "Grand Vitara"], base: 399000 },
  { brand: "Tata", models: ["Tiago", "Nexon EV", "Harrier", "Safari"], base: 560000 },
  { brand: "Hyundai", models: ["Exter", "Creta", "Verna", "Ioniq 5"], base: 613000 },
  { brand: "Mahindra", models: ["Thar", "Scorpio N", "XUV700"], base: 749000 },
  { brand: "Toyota", models: ["Glanza", "Fortuner", "Innova"], base: 680000 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Car.deleteMany({});
    
    const bulkCars = [];
    for (let i = 0; i < 205; i++) {
      const brandObj = indianBrands[i % indianBrands.length];
      const model = brandObj.models[i % brandObj.models.length];
      const carName = `${model} ${i > 50 ? `Ed. ${i}` : ""}`;
      
      // HASH LOGIC: Instead of i % length, use a unique number derived from the name
      // This shuffles the images so the same brand doesn't always have the same image
      const hash = carName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const imageIndex = hash % curatedImages.length;

      bulkCars.push({
        name: carName,
        brand: brandObj.brand,
        price: brandObj.base + (Math.floor(Math.random() * (brandObj.base * 0.5))),
        fuelType: model.includes("EV") ? "Electric" : "Petrol",
        transmission: "Automatic",
        bhp: 70 + (Math.floor(Math.random() * 400)),
        torque: 90 + (Math.floor(Math.random() * 300)),
        mileage: "17.5 kmpl",
        safetyRating: "5 Star",
        seating: model.includes("Safari") || model.includes("Fortuner") ? 7 : 5,
        image: curatedImages[imageIndex], // Shuffled pick
        description: `Premium ${brandObj.brand} ${model} performance.`
      });
    }

    await Car.insertMany(bulkCars);
    console.log("✅ MATRIX SHUFFLED: Repetition masked.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();