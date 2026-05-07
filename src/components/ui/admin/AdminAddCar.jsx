import { useState } from "react";
import API from "../../../api/api";

export default function AdminAddCar() {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) =>
      data.append(key, formData[key])
    );
    data.append("image", image);

    await API.post("/cars", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Car added successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="price" onChange={handleChange} placeholder="Price" />
      <input name="engine" onChange={handleChange} placeholder="Engine" />
      <input name="mileage" onChange={handleChange} placeholder="Mileage" />
      <input name="fuel" onChange={handleChange} placeholder="Fuel" />
      <input name="transmission" onChange={handleChange} placeholder="Transmission" />
      <input name="seating" onChange={handleChange} placeholder="Seating" />
      <input name="safety" onChange={handleChange} placeholder="Safety" />
      <input name="boot" onChange={handleChange} placeholder="Boot" />
      <input name="airbags" onChange={handleChange} placeholder="Airbags" />
      <input name="drive" onChange={handleChange} placeholder="Drive" />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button className="bg-sky-400 py-3 font-bold">Add Car</button>
    </form>
  );
}
