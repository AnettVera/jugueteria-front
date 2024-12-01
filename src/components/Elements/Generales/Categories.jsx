import React from "react";
import "../../../assets/Pages/Categories.scss";

import { IoSchoolSharp } from "react-icons/io5";
import { FaRobot, FaDice } from "react-icons/fa";
import { RiBearSmileFill } from "react-icons/ri";
import { IoIosConstruct } from "react-icons/io";
import { GiFlowerPot } from "react-icons/gi";

const Categories = () => {
  const categories = [
    { name: "Educativos", icon: <IoSchoolSharp color="var(--green-color)" /> },
    { name: "Electrónicos", icon: <FaRobot color="var(--blue-color)" /> },
    { name: "De mesa", icon: <FaDice color="var(--red-color)" /> },
    { name: "Peluches", icon: <RiBearSmileFill color="var(--brown-color)" /> },
    { name: "Construcción", icon: <IoIosConstruct color="var(--yellow-color)" /> },
    { name: "Exterior", icon: <GiFlowerPot color="var(--dark-color)" /> },
  ];

  return (
    <section className="categories">
      <ul className="categories-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <span className="category-icon">{category.icon}</span>
            <p className="category-name">{category.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
  