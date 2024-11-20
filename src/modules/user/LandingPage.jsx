import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/Pages/LandingPage.scss';
import { AuthContext } from '../../config/context/auth-context';
import Header from '../../components/Elements/Generales/Header';
import ProductCard from '../../components/Elements/Generales/ProductCard';
import Footer from '../../components/Elements/Generales/Footer';

const LandingPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="bg-background">
            <Header />

            <div className="text-center">
                <p className="text-center__slogan">"Frase alusiva a los juguetes o algún eslogan de la juguetería"</p>
                <input type="text" placeholder="Busca el producto que deseas" className="text-center__input" />
            </div>

            <div className="flex">
                <button className="flex__button">Educativos</button>
                <button className="flex__button">Electrónicos</button>
                <button className="flex__button">De mesa</button>
                <button className="flex__button">Peluches</button>
                <button className="flex__button">Construcción</button>
                <button className="flex__button">Exterior</button>
            </div>

            <h2 className="text-center__title">Los más populares</h2>
            <div className="flex">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
            <Footer />
        </div>
    );
}

export default LandingPage;