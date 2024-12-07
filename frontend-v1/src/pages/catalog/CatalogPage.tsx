import { useEffect } from 'react';
import { Button, Card, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchBuildings } from 'store/slices/buildingsSlice';
import { useAppDispatch } from 'store/hooks';
import { Loader } from 'ui/Loader/Loader';

import './CatalogPage.scss';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

export const CatalogPage = () => {
    const { buildings, loading, error } = useSelector((state: RootState) => state.buildings);
    const dispatch = useAppDispatch();

    const reloadBuildings = () => {
        dispatch(fetchBuildings());
    };

    useEffect(() => {
        dispatch(fetchBuildings());
    }, [dispatch]);

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
                    К сожалению, не удалось загрузить проекты. Попробуйте обновить страницу или
                    повторить попытку.
                </Paragraph>
                <Button type="primary" onClick={reloadBuildings}>
                    Повторить попытку
                </Button>
            </div>
        );
    }

    return (
        <div className="catalog-page">
            <Title level={1} className="catalog-title">
                Каталог проектов
            </Title>
            <div className="catalog-list">
                {buildings.map((building, index) => (
                    <Card
                        key={index}
                        hoverable
                        // cover={<img alt={building.name} src={building.image} />} // Если есть изображения
                        className="catalog-card"
                    >
                        <Meta title={building.name} description={building.description} />
                    </Card>
                ))}
            </div>
        </div>
    );
};
