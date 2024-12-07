import { Typography, Carousel } from 'antd';
import './ServicesCarousel.scss';

const { Title } = Typography;

export const ServicesCarousel = () => {
    const services = [
        {
            title: 'Проектирование и планирование',
            image: 'assets/service1.png', // путь к изображению
        },
        {
            title: 'Строительство под ключ',
            image: 'assets/service2.png', // путь к изображению
        },
        {
            title: 'Отделочные работы',
            image: 'assets/service3.png', // путь к изображению
        },
        {
            title: 'Ландшафтный дизайн',
            image: 'assets/service4.png', // путь к изображению
        },
        {
            title: 'Ремонт под ключ',
            image: 'assets/service5.png', // путь к изображению
        },
    ];

    return (
        <div className="services-carousel">
            <Title level={2} className="carousel-title">
                Наши услуги
            </Title>
            <Carousel
                autoplay
                autoplaySpeed={3000}
                slidesToShow={3}
                slidesToScroll={1}
                infinite
                className="carousel-container"
            >
                {services.map((service, index) => (
                    <div key={index} className="service-card">
                        <div
                            className="service-card-content"
                            style={{
                                backgroundImage: `url(${service.image})`,
                            }}
                        >
                            <div className="service-card-overlay">
                                <span className="service-card-title">{service.title}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};
