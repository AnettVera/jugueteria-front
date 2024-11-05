import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { DARK_THEME,LIGTH_THEME } from "./ThemeConstants";

export const ThemeContext = createContext({});
export const ThemeProvaider= ({children})=>{
    const [theme, setTheme]= useState(LIGTH_THEME);//Inicia por defecto en el tema claro
    window.localStorage.setItem("themeMode", theme) //Se guarda la eleccion en el local storage

    const toggleTheme=()=>{
        setTheme((prevTheme)=> prevTheme == LIGTH_THEME ? DARK_THEME : LIGTH_THEME)
        window.localStorage.setItem("themeMode", theme)
    }

    return(
        <ThemeContext.Provider value={{
            theme, toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

ThemeProvaider.propTypes={
    children: PropTypes.node.isRequired
}