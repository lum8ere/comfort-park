import { Typography, Carousel } from 'antd';
import './ServicesCarousel.scss';

const { Title } = Typography;

export const ServicesCarousel = () => {
    const services = [
        {
            title: 'Проектирование и планирование',
            image: 'assets/service1.png',
        },
        {
            title: 'Строительство под ключ',
            image: 'assets/service2.png',
        },
        {
            title: 'Отделочные работы',
            image: 'assets/service3.png',
        },
        {
            title: 'Ландшафтный дизайн',
            image: 'assets/service4.png',
        },
        {
            title: 'Ремонт под ключ',
            image: 'assets/service5.png',
        },
    ];

    const carouselSettings = {
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
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

    return (
        <div className="services-carousel">
            <Title level={2} className="carousel-title">
                Наши услуги
            </Title>
            <Carousel {...carouselSettings}>
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
