import type {IconType} from "react-icons";
import {
  FaLaptop,
  FaHeadphones,
  FaMobileAlt,
  FaCamera,
  FaClock,
  FaVolumeUp,
  FaTshirt,
  FaUserTie,
  FaShoePrints,
  FaHatCowboy,
  FaSocks,
  FaBlender,
  FaCoffee,
  FaUtensils,
  FaBreadSlice,
  FaTools,
} from "react-icons/fa";

export const productIconConfig:Record<string,IconType>={
 
  Laptop: FaLaptop,
  Headphones: FaHeadphones,
  Smartphone: FaMobileAlt,
  Camera: FaCamera,
  Smartwatch: FaClock,
  Speaker: FaVolumeUp,

  "T-Shirt": FaTshirt,
  Jeans: FaUserTie,
  Jacket: FaUserTie,
  Shoes: FaShoePrints,
  Hat: FaHatCowboy,
  Socks: FaSocks,

  Mixer: FaTools,
  Toaster: FaBreadSlice,
  "Knife Set": FaUtensils,
  Pan: FaUtensils,
  "Coffee Maker": FaCoffee,
  Blender: FaBlender,
};
