import { useEffect } from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchBuildings } from 'store/slices/buildingsSlice';
import { useAppDispatch } from 'store/hooks';
import { Loader } from 'ui/Loader/Loader';
import { BuildingCard } from 'components/card/buildingCard';

import './CatalogPage.scss';

const { Title, Paragraph } = Typography;

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
                    К сожалению, не удалось загрузить каталог. Попробуйте обновить страницу или
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

            <Row gutter={[16, 16]} style={{ justifyContent: "center" }}>
                {buildings.map((building) => (
                    <Col
                        key={building.id}
                        xs={24} // на мобильных устройствах 1 карточка в ряд
                        sm={12} // на планшетах 2 карточки в ряд
                        md={8}  // на десктопах 3 карточки в ряд
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <BuildingCard
                            images={building.photos || []}
                            name={building.name}
                            size={building.size}
                            floors={building.floors}
                            area={building.area}
                            price={building.price}
                            badge={building.bange}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
