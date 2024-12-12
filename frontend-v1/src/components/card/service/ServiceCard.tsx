import { memo } from 'react';
import './ServiceCard.scss';

interface ServiceCardProps {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    imageURL?: string;
    isActive?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = memo(({ name, imageURL }) => {
    return (
        <div className="service-card-page" style={{ backgroundImage: `url(${imageURL})`}}>
            <div className="service-card-page_header">
                <h2 className="service-card-page_title">{name}</h2>
            </div>
            <button className="service-card-page_button">Подробнее</button>
        </div>
    );
});
