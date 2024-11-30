import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3>سوال پیچ</h3>
                <p>آدرس : ایران ، تهران ، میدان آزادی ، خیابان قاسمی ، دانشگاه صنعتی شریف</p>
                <ul className="socials">
                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                    <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                    <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>تمامی حقوق محفوظ است © 2024 ، طراحی شده توسط<span> تیم سوال پیچ </span></p>
            </div>
        </footer>
    );
};

export default Footer;
