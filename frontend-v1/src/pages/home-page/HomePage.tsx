import { Button, Modal, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import houseImage from 'assets/home-page-start.png';
import './HomePage.scss';

// Импортируем компонент ServicesCarousel
import { ServicesCarousel } from './service-carousel/ServicesCarousel';
import { useState } from 'react';

const { Title, Paragraph } = Typography;

export const HomePage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

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
                        <Button
                            type="primary"
                            size="large"
                            className="calculate-button"
                            onClick={() => showModal()}
                        >
                            Рассчитать стоимость
                        </Button>
                        <Button
                            type="default"
                            size="large"
                            className="calculate-button"
                            onClick={() => navigate('/catalog')}
                        >
                            Посмотреть каталог
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services">
                <ServicesCarousel />
            </section>

            <Modal
                open={open}
                title="Ипотечный калькулятор"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn }) => (
                    <>
                        <OkBtn />
                    </>
                )}
                className="custom-modal"
            >
                <iframe
                    id="calculator-iframe"
                    src="https://ipoteka.domclick.ru/calc-reg/calculator.html"
                    width="100%"
                    height="600px" // Установите нужную высоту
                    style={{ border: 'none' }} // Убираем рамку iframe
                />
            </Modal>
        </div>
    );
};
