import React, { useState, useEffect } from "react";
import "./../../assets/Pages/user/CustomProducts.scss";
import Decorative from "./../../assets/images/decorative.svg";
import { IoSchoolSharp } from "react-icons/io5";
import { RiRobot2Fill, RiBearSmileFill } from "react-icons/ri";
import { PiLegoDuotone } from "react-icons/pi";
import { FaDice } from "react-icons/fa6";
import { PiFlowerTulipFill } from "react-icons/pi";
import axios from "axios";

const colorMapping = {
  'Electrónicos': '#001eff',
  'De Mesa': '#ff0000',
  'Construcción': '#ffd700',
  'Exterior': '#00ff00',
  'Peluches': '#8b4513',
  'Educativos': '#008000'
}

const iconMapping = {
  'Electrónicos': <RiRobot2Fill />,
  'De Mesa': <FaDice />,
  'Construcción': <PiLegoDuotone />,
  'Exterior': <PiFlowerTulipFill />,
  'Peluches': <RiBearSmileFill />,
  'Educativos': <IoSchoolSharp />
}

const CustomProducts = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({
    default: {
      title: "Toy Store",
      phrase: "Juguetes que inspiran la imaginación de niños y adultos.",
      waveClass: "default-wave",
      showImage: true,
      color: "#ff0000",
      products: 'Lo más popular'
    }
  });  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:6868/toystore/categories');  
        const apiCategories = response.data.reduce((acc, category) => {
          const normalizedKey = category.name.toLowerCase().replace(/\s+/g, '');
          
          acc[normalizedKey] = {
            id: category.id,
            title: category.name === 'De Mesa' ? 'De Mesa' : category.name , 
            phrase: category.description,
            waveClass: "category-wave",
            showImage: false,
            showButton: true,
            icon: iconMapping[category.name],
            color: colorMapping[category.name],
            products: category.name
          };
          return acc;
        }, { ...categories });
        setCategories(apiCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(
        categories[category]?.products || "Lo más popular",
        categories[category]?.id || null
      );
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
            <img src={Decorative} alt="Decorative"
            className="image"/>
            <div
              className="circle"
              style={{ backgroundColor: color }}
            >
            </div>
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

