import React, { useState } from "react";
import "./../../assets/Pages/user/CustomProducts.scss";
import Decorative from "./../../assets/images/decorative.svg";
import { IoSchoolSharp } from "react-icons/io5";
import { RiRobot2Fill, RiBearSmileFill } from "react-icons/ri";
import { PiLegoDuotone } from "react-icons/pi";
import { FaDice } from "react-icons/fa6";
import { PiFlowerTulipFill } from "react-icons/pi";
import Header from "./../../components/Elements/Generales/Header";
import ProductCard from './../../components/Elements/Generales/ProductCard'

const categories = {
  default: {
    title: "Toy Store",
    phrase: "Juguetes que inspiran la imaginación de niños y adultos.",
    waveClass: "default-wave",
    showImage: true,
    showButton: false,
    color: "#ff0000", 
    products:'Lo más popular'
  },
  electronicos: {
    title: "ELECTRONICOS",
    phrase: "Encuentra tu animatrónico ideal y llena tu vida de diversión",
    waveClass: "category-wave",
    showImage: false,
    showButton: true,
    icon: <RiRobot2Fill />,
    color: "#001eff", 
    products:'Electronicos'
  },
  demesa: {
    title: "JUEGOS DE MESA",
    phrase: "Diviértete en familia",
    waveClass: "category-wave",
    showImage: false,
    showButton: true,
    icon: <FaDice />,
    color: "#ff0000",
    products:'Juegos de mesa'
  },
  Construccion: {
    title: "JUEGOS DE CONSTRUCCIÓN",
    phrase: "Construye tu diversión",
    waveClass: "category-wave",
    showImage: false,
    showButton: true,
    icon: <PiLegoDuotone />,
    color: "#ffd700", 
    products:'Juegos de construcción'
  },
  Exteriores: {
    title: "JUEGOS PARA EXTERIORES",
    phrase: "Diviértete mientras disfrutas de la naturaleza",
    waveClass: "category-wave",
    showImage: false,
    showButton: true,
    icon: <PiFlowerTulipFill />,
    color: "#00ff00", 
    products:'Juegos para exteriores'
  },
  Peluches: {
    title: "Peluches",
    phrase: "Encuentra a tu mejor amigo",
    waveClass: "category-wave",
    showImage: false,
    showButton: true,
    icon: <RiBearSmileFill />,
    color: "#8b4513", 
    products:'Peluches'
  },
  Educativos: {
    title: "JUEGOS EDUCATIVOS",
    phrase: "Aprende mientras juegas",
    waveClass: "category-wave",
    showImage: false,
    showButton: true,
    icon: <IoSchoolSharp />,
    color: "#008000", 
    products:'Juegos educativos'
  },
};

const CustomProducts = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("default");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(categories[category]?.products || "Lo más popular");
    }
  };

  const { title, phrase, waveClass, showImage, color } =
    categories[selectedCategory] || categories.default;

  return (
    <div className="custom-products">
      <header className={`header ${waveClass}`}>
        <div className="header-content">
          <h1>{title}</h1>
          <p>{phrase}</p>
        </div>
        {showImage ? (
          <img
            src="https://i.pinimg.com/originals/fb/14/dd/fb14dd15ec54616867445fc670cd8e5f.png"
            alt="Decorative"
            className="header-image"
          />
        ) : (
          <div className="header-circles">
            <div
              className="circle"
              style={{ backgroundColor: color }}
            ></div>
            <div
              className="circle"
              style={{ backgroundColor: `${color}80` }}
            ></div>
          </div>
        )}
      </header>
      <nav className="categories">
        {Object.keys(categories).map(
          (key) =>
            key !== "default" && (
              <div key={key} className="category-wrapper">
                <button
                  className={`category-button ${
                    selectedCategory === key ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(key)}
                  style={{
                    borderColor:
                      selectedCategory === key
                        ? categories[key].color
                        : "transparent",
                    color:
                      selectedCategory === key
                        ? categories[key].color
                        : "inherit",
                  }}
                >
                  {categories[key].icon &&
                    React.cloneElement(categories[key].icon, {
                      style: { color: categories[key].color },
                    })}
                </button>
                <div className="category-text">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              </div>
            )
        )}
      </nav>
    </div>
  );
};

export default CustomProducts;

