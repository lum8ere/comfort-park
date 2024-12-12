import { memo, useEffect, useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchServices } from 'store/slices/services/servicesSlice';
import { useAppDispatch } from 'store/hooks';
import { Loader } from 'ui/Loader/Loader';
import { ServiceCard } from 'components/card/service/ServiceCard';
import { selectServises } from 'store/slices/services/serviceSelectors';

import './ServicePage.scss';

const { Title, Paragraph } = Typography;

export const ServicePage = memo(() => {
    const dispatch = useAppDispatch();

    // Селектор для получения всех зданий
    const services = useSelector(selectServises);

    const { loading, error } = useSelector((state: RootState) => state.services);

    // Состояние для управления количеством видимых зданий
    const [visibleCount, setVisibleCount] = useState(6);

    const reloadSerivce = () => {
        dispatch(fetchServices());
    };

    // Загрузить данные при монтировании компонента
    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

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
                <Button type="primary" onClick={reloadSerivce}>
                    Повторить попытку
                </Button>
            </div>
        );
    }

    return (
        <div className="service-page">
            <section className="service-title">
                <h1>Услуги</h1>
            </section>

            <Row gutter={[16, 16]} style={{ justifyContent: 'center' }}>
                {services.map((service) => (
                    <Col
                        key={service.id}
                        xs={24} // на мобильных устройствах 1 карточка в ряд
                        sm={12} // на планшетах 2 карточки в ряд
                        md={8} // на десктопах 3 карточки в ряд
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <ServiceCard imageURL={service.image_url} name={service.name} />
                    </Col>
                ))}
            </Row>
        </div>
    );
});
