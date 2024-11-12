import { Button, Card, List, Typography } from 'antd';
import houseImage from 'assets/home-page-start.png';
import './HomePage.scss';

const { Title, Paragraph } = Typography;

export const HomePage = () => {
    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero">
                <img src={houseImage} alt="Дом в Чебоксарах" className="hero-image" />
                <div className="hero-content">
                    <Title level={1}>Строительство домов и коттеджей под ключ в Чебоксарах</Title>
                    <List
                        className="hero-benefits"
                        dataSource={[
                            '✅ Без изменения цен в ходе строительства',
                            '✅ Качественные дома под ключ от 400 тыс.руб',
                            '✅ Строительство домов с гарантией и оплатой по факту завершения'
                        ]}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                    <Button type="primary" size="large" className="hero-button">
                        Посмотреть проекты
                    </Button>
                </div>
            </section>

            {/* Services Section */}
            <section className="services">
                <Title level={2}>Наши услуги</Title>
                <div className="services-list">
                    <Card
                        title="Проектирование и планировка"
                        bordered={false}
                        className="service-item"
                    >
                        <Paragraph>
                            Мы предлагаем услуги по проектированию домов, учитывая все ваши
                            пожелания и бюджет. Наши архитекторы создадут идеальный проект для вас.
                        </Paragraph>
                    </Card>
                    <Card title="Строительство под ключ" bordered={false} className="service-item">
                        <Paragraph>
                            Полный цикл строительства, начиная с фундамента и заканчивая отделкой и
                            подключением всех коммуникаций.
                        </Paragraph>
                    </Card>
                    <Card title="Отделочные работы" bordered={false} className="service-item">
                        <Paragraph>
                            Профессиональные мастера выполняют отделочные работы любой сложности,
                            чтобы сделать ваш дом уютным и комфортным.
                        </Paragraph>
                    </Card>
                </div>
            </section>

            {/* About Us Section */}
            <section className="about-us">
                <Title level={2}>О нас</Title>
                <Paragraph>
                    Наша компания занимается строительством домов с 2010 года. За это время мы
                    построили более 200 домов в Чебоксарах и окрестностях. Мы гордимся качеством
                    своей работы и доверием наших клиентов.
                </Paragraph>
            </section>

            {/* Contact Section */}
            <section className="contact">
                <Title level={2}>Свяжитесь с нами</Title>
                <Paragraph>
                    Хотите начать строительство дома вашей мечты? Свяжитесь с нами по телефону или
                    заполните форму обратной связи, и мы поможем вам на каждом этапе.
                </Paragraph>
                <Button type="primary" size="large" className="contact-button">
                    Связаться с нами
                </Button>
            </section>
        </div>
    );
};
