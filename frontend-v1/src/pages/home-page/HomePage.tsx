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
                            Старт продаж одноэтажных кирпичных домов 
                            от застройщика в Нижегородской
                            области
                        </Title>
                        {/* <Paragraph className="hero-subtitle">
                            Преимущества поселка: <br />
                            Одноэтажные кирпичные дома от застройщика <br />
                            Дома из блоков <br />
                            Земельный участок 8 соток <br />
                            Коммуникации <br />
                            Отделка под ключ <br />
                            Сельская, семейная и Айти ипотеки <br />
                        </Paragraph> */}
                        <Paragraph className="hero-subtitle">Преимущества поселка:</Paragraph>

                        <div className="benefits-wrapper">
                            <ul className="benefits-list benefits-list-left">
                                <li>Одноэтажные кирпичные дома от застройщика</li>
                                <li>Дома из блоков</li>
                                <li>Земельный участок 8 соток</li>
                            </ul>
                            <ul className="benefits-list benefits-list-right">
                                <li>Коммуникации</li>
                                <li>Отделка под ключ</li>
                                <li>Сельская, семейная и Айти ипотеки</li>
                                {/* <li>Фото- и видео-отчеты в процессе строительства</li> */}
                            </ul>
                        </div>
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
