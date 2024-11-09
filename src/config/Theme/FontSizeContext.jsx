import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FONT_SMALL, FONT_NORMAL, FONT_LARGE } from './FontSizeConstants';

const FontSizeContext = createContext({});

export const FontSizeProvider = ({ children }) => {
    const [size, setSize] = useState(() => {
        return localStorage.getItem('fontSize') || FONT_NORMAL;
    });

    useEffect(() => {
        localStorage.setItem("fontSize", size);
    }, [size]);

    const toggleFontSize = () => {
        setSize((prevFontSize) => (prevFontSize === FONT_NORMAL ? FONT_LARGE : FONT_NORMAL));
    };

    return (
        <FontSizeContext.Provider value={{ size, toggleFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

FontSizeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FontSizeContext;
