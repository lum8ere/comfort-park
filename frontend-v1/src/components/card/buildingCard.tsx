import React from 'react';
import { Card, Carousel, Typography, Button } from 'antd';
import { ChartArea, HouseSize, StairsFloor } from 'assets/card';
import testImage from 'assets/testImage.png';

import './BuildingCard.scss';

const { Title, Paragraph } = Typography;

interface BuildingCardProps {
    images: string[];
    name: string;
    size: string;
    floors: number;
    area: number;
    material?: string;
    type?: string;
    price?: number | string;
    badge?: string;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({
    images,
    name,
    size,
    floors,
    area,
    badge
}) => {
    const displayImages = images.length > 0 ? images : [testImage];

    return (
        <Card className="building-card">
            <div className="image-section">
                <Carousel
                    autoplay
                    arrows={displayImages.length > 1}
                    className="building-card-carousel"
                    dots={false}
                >
                    {displayImages.map((image, index) => (
                        <div key={index} className="carousel-image-container">
                            <img src={image} alt={name} className="carousel-image" />
                        </div>
                    ))}
                </Carousel>
                {badge && <div className="badge">{badge}</div>}
            </div>
            <div className="content-section">
                <Title level={4} className="building-card-title">{`Проект "${name}"`}</Title>

                <div className="column-section">
                    <div className="info-column">
                        <div className="info-item">
                            <div className="info-icon-container">
                                <ChartArea className="info-icon" />
                            </div>
                            <div className="info-text">
                                <Paragraph className="info-label">Площадь:</Paragraph>
                                <Paragraph className="info-value">{area} м²</Paragraph>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon-container">
                                <HouseSize className="info-icon" />
                            </div>
                            <div className="info-text">
                                <Paragraph className="info-label">Размеры:</Paragraph>
                                <Paragraph className="info-value">{size}</Paragraph>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon-container">
                                <StairsFloor className="info-icon" />
                            </div>
                            <div className="info-text">
                                <Paragraph className="info-label">Этажность:</Paragraph>
                                <Paragraph className="info-value">{floors}</Paragraph>
                            </div>
                        </div>
                    </div>

                    <div className="button-wrapper">
                        <Button className="details-button">Подробнее</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};
