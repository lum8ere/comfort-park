import React from 'react';
import { Card, Carousel, Typography, Divider, Tooltip } from 'antd';
import { HeartOutlined, AppstoreOutlined } from '@ant-design/icons';
import noPhoto from 'assets/no-photo.png';

import './BuildingCard.scss';
import { ChartArea, HouseSize, StairsFloor } from 'assets/card';

const { Title, Paragraph } = Typography;

interface BuildingCardProps {
    images: string[];
    name: string;
    size: string;
    floors: number;
    area: number;
    mansard?: string;
    material?: string;
    type?: string;
    price?: string;
    badge?: string;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({
    images,
    name,
    size,
    floors,
    area,
    mansard = 'Нет',
    material = 'Не указано',
    type = 'Не указан',
    price = 'От 0 руб',
    badge
}) => {
    const displayImages = images.length > 0 ? images : [noPhoto]; // Замените на ваш путь к заглушке

    return (
        <Card className="building-card">
            <div className="image-section">
                {/* Карусель изображений */}
                <Carousel autoplay arrows className="building-card-carousel" dots={false}>
                    {displayImages.map((image, index) => (
                        <div key={index} className="carousel-image-container">
                            <img src={image} alt={name} className="carousel-image" />
                        </div>
                    ))}
                </Carousel>

                {/* Бейдж (опционально) */}
                {badge && <div className="badge">{badge}</div>}

                {/* Цена и иконки поверх изображения */}
                <div className="price-overlay">
                    <div className="price-text">{price}</div>
                    <div className="icons">
                        {/* <Tooltip title="Добавить в избранное">
                            <HeartOutlined className="icon" />
                        </Tooltip> */}
                        <Tooltip title="Подробнее о проекте">
                            <AppstoreOutlined className="icon" />
                        </Tooltip>
                    </div>
                </div>
            </div>

            {/* Основная информация о проекте */}
            <div className="content-section">
                <Title level={4} className="building-card-title">{`Проект "${name}"`}</Title>
                <div className="info-grid">
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

                    <div className="info-item">
                        <div className="info-icon-container">
                            <ChartArea className="info-icon" />
                        </div>
                        <div className="info-text">
                            <Paragraph className="info-label">Площадь:</Paragraph>
                            <Paragraph className="info-value">{area} м²</Paragraph>
                        </div>
                    </div>
                </div>

                <Divider />

                <div className="material-info">
                    <Paragraph>
                        <strong>Материал:</strong> {material}
                    </Paragraph>
                    <Paragraph>
                        <strong>Тип:</strong> {type}
                    </Paragraph>
                </div>
            </div>
        </Card>
    );
};
