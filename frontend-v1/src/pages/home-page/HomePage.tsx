import { Button, Typography } from 'antd';
import houseImage from 'assets/home-page-start.png';
import './HomePage.scss';

// Импортируем компонент ServicesCarousel
import { ServicesCarousel } from './service-carousel/ServicesCarousel';

const { Title, Paragraph } = Typography;

export const HomePage = () => {
    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero">
                <img src={houseImage} alt="Дом в Чебоксарах" className="hero-image" />
                <div className="hero-overlay">
                    <div className="hero-content">
                        <Title level={1} className="hero-title">
                            Строительство домов и коттеджей под ключ в Чебоксарах
                        </Title>
                        <Paragraph className="hero-subtitle">
                            Без изменения цен в ходе строительства <br />
                            Качественные дома под ключ от 400 тыс. рублей <br />
                            Строительство домов с гарантией и оплатой по факту завершения работ{' '}
                            <br />
                            Фото- и видео-отчеты в процессе строительства
                        </Paragraph>
                    </div>
                    <div className="hero-buttons">
                        <Button type="primary" size="large" className="calculate-button">
                            Рассчитать стоимость
                        </Button>
                        <Button type="default" size="large" className="calculate-button">
                            Посмотреть проекты
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services">
                <ServicesCarousel />
            </section>
        </div>
    );
};
