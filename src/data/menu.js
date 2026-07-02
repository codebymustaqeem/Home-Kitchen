import biryani from "../assets/biryani.jpg";
import burger from "../assets/burger.jpg";
import karahi from "../assets/karahi.jpg";

export const categories = ["Biryani", "Burgers", "Karahi"];

export const menu = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: 350,
    category: "Biryani",
    image: biryani,
  },
  {
    id: 2,
    name: "Zinger Burger",
    price: 450,
    category: "Burgers",
    image: burger,
  },
  {
    id: 3,
    name: "Chicken Karahi (Half)",
    price: 750,
    category: "Karahi",
    image: karahi,
  },
];
