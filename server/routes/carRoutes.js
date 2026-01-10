import express from "express";

const router = express.Router();

// TEMP STATIC CAR DATA (no Mongo yet)
router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Hyundai Creta",
      price: "₹11.00 Lakh",
      fuel: "Petrol",
      transmission: "Manual",
      mileage: "17 kmpl",
      image: "/cars/creta.jpg",
    },
    {
      id: 2,
      name: "Kia Seltos",
      price: "₹10.90 Lakh",
      fuel: "Petrol",
      transmission: "Automatic",
      mileage: "16 kmpl",
      image: "/cars/seltos.jpg",
    },
    {
      id: 3,
      name: "Tata Harrier",
      price: "₹15.50 Lakh",
      fuel: "Diesel",
      transmission: "Manual",
      mileage: "14 kmpl",
      image: "/cars/harrier.jpg",
    },
    {
      id: 4,
      name: "Mahindra XUV700",
      price: "₹14.00 Lakh",
      fuel: "Petrol",
      transmission: "Automatic",
      mileage: "13 kmpl",
      image: "/cars/xuv700.jpg",
    },
    {
      id: 5,
      name: "Toyota Fortuner",
      price: "₹32.00 Lakh",
      fuel: "Diesel",
      transmission: "Automatic",
      mileage: "10 kmpl",
      image: "/cars/fortuner.jpg",
    }
  ]);
});

export default router;
