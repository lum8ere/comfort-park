import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Carousel, Spin, Alert, Modal, Button } from 'antd';
import { RootState } from 'store';
import { useAppDispatch } from 'store/hooks';
import { fetchServices } from 'store/slices/services/servicesSlice';
import { selectServices } from 'store/slices/services/serviceSelectors';
import './ServicesCarousel.scss';

const { Title } = Typography;

export const ServicesCarousel = () => {
    const dispatch = useAppDispatch();
    const [selectedService, setSelectedService] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const services = useSelector(selectServices);
    const { loading, error } = useSelector((state: RootState) => state.services);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    // Дублируем записи если их меньше 3
    const getDisplayedServices = () => {
        if (services.length === 0) return [];
        if (services.length >= 3) return services;
        
        const repeatedServices = [];
        while (repeatedServices.length < 3) {
            repeatedServices.push(...services);
        }
        return repeatedServices.slice(0, 3);
    };

    const displayedServices = getDisplayedServices();

    const handleCardClick = (service: any) => {
        if (service.is_active) {
            setSelectedService(service);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <div className="services-carousel">
            <Title level={2} className="carousel-title">Наши услуги</Title>
            
            {loading ? (
                <Spin />
            ) : error ? (
                <Alert message="Ошибка загрузки" type="error" />
            ) : (
                <>
                    <Carousel {...carouselSettings}>
                        {displayedServices.map((service, index) => (
                            <div 
                                key={`${service.id}-${index}`}
                                className="service-item"
                                onClick={() => handleCardClick(service)}
                            >
                                <div className={`service-card ${!service.is_active ? 'inactive' : ''}`}>
                                    <div 
                                        className="service-image" 
                                        style={{ backgroundImage: `url(${service.image_url})` }}
                                    >
                                        <div className="service-overlay">
                                            <h3 className="service-name">{service.name}</h3>
                                            {!service.is_active && (
                                                <div className="service-status">Недоступно</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>

                    <Modal
                        title={selectedService?.name}
                        open={isModalOpen}
                        onCancel={handleCloseModal}
                        footer={null}
                        className="service-modal"
                    >
                        {selectedService && (
                            <div className="modal-content">
                                {selectedService.price && (
                                    <div className="price-section">
                                        <span className="price-label">Стоимость:</span>
                                        <span className="price-value">
                                            {selectedService.price.toLocaleString()} ₽
                                        </span>
                                    </div>
                                )}
                                
                                {selectedService.description && (
                                    <div className="description-section">
                                        <h3>Описание услуги:</h3>
                                        <p>{selectedService.description}</p>
                                    </div>
                                )}

                                <div className="contacts-section">
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        href="tel:+79876735155"
                                        className="call-button"
                                    >
                                        Позвонить: +7 (987) 673-51-55
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Modal>
                </>
            )}
        </div>
    );
};