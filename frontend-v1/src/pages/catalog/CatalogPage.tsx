import { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchBuildings } from 'store/slices/buildings/buildingsSlice';
import { useAppDispatch } from 'store/hooks';
import { Loader } from 'ui/Loader/Loader';
import { BuildingCard } from 'components/card/building/buildingCard';
import { selectBuildings } from 'store/slices/buildings/buildingSelectors';

import './CatalogPage.scss';

const { Title, Paragraph } = Typography;

export const CatalogPage = () => {
    const dispatch = useAppDispatch();

    // Селектор для получения всех зданий
    const buildings = useSelector(selectBuildings);

    const { loading, error } = useSelector((state: RootState) => state.buildings);

    // Состояние для управления количеством видимых зданий
    const [visibleCount, setVisibleCount] = useState(6);

    const reloadBuildings = () => {
        dispatch(fetchBuildings());
    };

    // Загрузить данные при монтировании компонента
    // useEffect(() => {
    //     dispatch(fetchBuildings());
    // }, [dispatch]);

    // Обработчик события прокрутки
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            setVisibleCount((prev) => prev + 6); // Увеличиваем количество видимых элементов
        }
    };

    // Добавляем обработчик прокрутки
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <section className="catalog-title">
                <h1>Каталог</h1>
            </section>

            <section className="catalog-title">
                <Row gutter={[16, 16]} style={{ justifyContent: 'center' }}>
                    {buildings.map((building) => (
                        <Col
                            key={building.id}
                            xs={24} // на мобильных устройствах 1 карточка в ряд
                            sm={12} // на планшетах 2 карточки в ряд
                            md={8} // на десктопах 3 карточки в ряд
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <BuildingCard
                                id={building.id}
                                images={building.Photos || []}
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
            </section>
        </div>
    );
};
