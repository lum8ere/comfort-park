import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Carousel, Spin, Alert } from 'antd';
import { RootState } from 'store';
import { useAppDispatch } from 'store/hooks';
import { fetchServices } from 'store/slices/services/servicesSlice';
import { selectServices } from 'store/slices/services/serviceSelectors';

import './ServicesCarousel.scss';

const { Title } = Typography;

export const ServicesCarousel = () => {
    const dispatch = useAppDispatch();

    // Селектор для получения всех услуг
    const services = useSelector(selectServices);
    
    // Селектор для получения состояния загрузки и ошибки
    const { loading, error } = useSelector((state: RootState) => state.services);

    useEffect(() => {
        // Запрашиваем услуги при монтировании компонента
        dispatch(fetchServices());
    }, [dispatch]);

    // Обработка случая, когда есть только одна услуга
    let displayedServices = services;
    if (services.length === 1) {
        // Создаем новый массив с тремя копиями одной услуги
        displayedServices = Array(3).fill(services[0]);
    }

    const carouselSettings = {
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: displayedServices.length > 1, // Зацикливаем карусель только если больше одной услуги
        className: 'carousel-container',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
        arrows: true, // Убедитесь, что стрелки отображаются
    };

    if (loading) {
        return (
            <div className="services-carousel">
                <Title level={2} className="carousel-title">
                    Наши услуги
                </Title>
                <Spin tip="Загрузка услуг..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="services-carousel">
                <Title level={2} className="carousel-title">
                    Наши услуги
                </Title>
                <Alert message="Ошибка" description={error} type="error" showIcon />
            </div>
        );
    }

    return (
        <div className="services-carousel">
            <Title level={2} className="carousel-title">
                Наши услуги
            </Title>
            <Carousel {...carouselSettings}>
                {displayedServices.map((service, index) => (
                    <div key={services.length === 1 ? `${service.id}-${index}` : service.id} className="service-card">
                        <div
                            className="service-card-content"
                            style={{
                                backgroundImage: `url(${service.image_url})`,
                            }}
                        >
                            <div className="service-card-overlay">
                                <span className="service-card-title">{service.name}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};
