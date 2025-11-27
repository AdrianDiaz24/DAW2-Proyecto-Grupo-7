import React from "react";
import Navbar from "../molecules/Navbar";
import Footer from "../molecules/Footer";
import "../../styles/Layout.css";

const MainLayout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
