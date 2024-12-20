import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Image } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useAppDispatch } from 'store/hooks';
import { fetchBuilding } from 'store/slices/buildings/buildingItem';
import { selectBuildingItem } from 'store/slices/buildings/buildingSelectors';
import { Loader } from 'ui/Loader/Loader';

import './CatalogDetailPage.scss';
import { ChartArea, HouseSize, Price, StairsFloor } from 'assets/card';

const { Title, Paragraph } = Typography;
const { PreviewGroup } = Image;

interface Photo {
    id: string;
    url: string;
    building_id: string;
    is_gallery: boolean;
    created_at: string; // или Date, в зависимости от реализации
}

interface Building {
    id: string;
    name: string;
    photos: Photo[];
    area: number;
    size: string;
    floors: number;
    price: number | string;
    description: string;
    // Добавьте другие необходимые поля
}

export const CatalogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Получаем ID из URL
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
    const dispatch = useAppDispatch();

    const { loading, error } = useSelector((state: RootState) => state.buildings);
    const building = useSelector(selectBuildingItem);

    useEffect(() => {
        if (id) {
            dispatch(fetchBuilding(id));
        }
    }, [dispatch, id]);

    const reloadBuildings = () => {
        if (id) {
            dispatch(fetchBuilding(id));
        }
    };

    if (loading)
        return (
            <div className="centered-content">
                <Loader />
            </div>
        );

    if (error) {
        return (
            <div className="centered-content">
                <Title level={3}>Ошибка загрузки данных</Title>
                <Paragraph>
                    К сожалению, не удалось загрузить товар. Попробуйте обновить страницу или
                    повторить попытку.
                </Paragraph>
                <Button type="primary" onClick={reloadBuildings}>
                    Повторить попытку
                </Button>
            </div>
        );
    }

    if (!building) {
        return (
            <div className="centered-content">
                <Title level={3}>Данные не найдены</Title>
                <Paragraph>
                    К сожалению, информация о данном объекте отсутствует.
                </Paragraph>
            </div>
        );
    }

    const photos = building.Photos;
    const mainPhoto = photos[selectedPhotoIndex];

    return (
        <div className="catalog-detail-page">
            <Title level={1} className="catalog-detail-title">
                {building.name}
            </Title>
            <div className="catalog-detail-container">
                <div className="catalog-detail-left">
                    {photos.length > 0 && (
                        <div className="photo-gallery">
                            <PreviewGroup>
                                <div className="main-photo-wrapper">
                                    <Image
                                        src={mainPhoto?.url}
                                        alt={`Изображение ${selectedPhotoIndex + 1}`}
                                        className="main-photo"
                                        preview={{
                                            mask: false
                                        }}
                                    />
                                </div>
                                {photos.length > 1 && (
                                    <div className="thumbnails">
                                        {photos.map((photo, index) => {
                                            if (index === selectedPhotoIndex) return null;
                                            return (
                                                <div
                                                    key={photo.id}
                                                    className="thumbnail-wrapper"
                                                    onClick={() => setSelectedPhotoIndex(index)}
                                                >
                                                    <Image
                                                        src={photo.url}
                                                        alt={`Миниатюра ${index + 1}`}
                                                        className="thumbnail"
                                                        preview={false}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </PreviewGroup>
                        </div>
                    )}
                </div>
                <div className="catalog-detail-right">
                    <div className="characteristics-block">
                        <Title level={4}>Характеристики</Title>

                        <div className="column-section">
                            <div className="info-column">
                                <div className="info-item">
                                    <div className="info-icon-container">
                                        <ChartArea className="info-icon" />
                                    </div>
                                    <div className="info-text">
                                        <Paragraph className="info-label">Площадь:</Paragraph>
                                        <Paragraph className="info-value">
                                            {building.area} м²
                                        </Paragraph>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon-container">
                                        <HouseSize className="info-icon" />
                                    </div>
                                    <div className="info-text">
                                        <Paragraph className="info-label">Размеры:</Paragraph>
                                        <Paragraph className="info-value">
                                            {building.size}
                                        </Paragraph>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon-container">
                                        <StairsFloor className="info-icon" />
                                    </div>
                                    <div className="info-text">
                                        <Paragraph className="info-label">Этажность:</Paragraph>
                                        <Paragraph className="info-value">
                                            {building.floors}
                                        </Paragraph>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon-container">
                                        <Price className="info-icon" />
                                    </div>
                                    <div className="info-text">
                                        <Paragraph className="info-label">Цена:</Paragraph>
                                        <Paragraph className="info-value">
                                            От {building.price} рублей
                                        </Paragraph>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="description-block">
                        <Title level={4}>Описание проекта</Title>
                        <Paragraph>{building.description}</Paragraph>
                    </div>
                </div>
            </div>
        </div>
    );
};
