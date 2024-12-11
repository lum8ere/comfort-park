import React from 'react';
import './ServiceCard.scss';

export const ServiceCard = () => {
    return (
        <div
            className="service-card-page"
            style={{ backgroundImage: `url('src/assets/home-page-start.png')` }}
        >
            <div className="service-card-page_header">
                <h2 className="service-card-page_title">Проектирование и планирование</h2>
            </div>
            <button className="service-card-page_button">Подробнее</button>
        </div>
    );
};
