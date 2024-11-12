import { Layout, Button, Tooltip, Row, Col, Typography } from 'antd';
import { SOCIAL_LINKS } from 'constants/socialLinks';
import { COMPANY_NAME, COMPANY_PHONE } from 'constants/constants';
import { Link } from 'react-router-dom'; // Если используете react-router
import './Footer.scss';

const { Title, Text } = Typography;

export const Footer = () => {
    return (
        <Layout.Footer className="footer">
            <div className="footer-content">
                <Row justify="center" gutter={[16, 16]}>
                    {/* БЛОК 1 - медиа, название компании, телефон */}
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-block">
                            {/* Добавляем логотип */}
                            <div className="company-logo">
                                {/* <img src={} alt="Логотип компании" /> */}
                                Логотип компании
                            </div>
                            {/* Иконки социальных сетей */}
                            <div className="social-icons">
                                {SOCIAL_LINKS.map((link) => (
                                    <Tooltip title={link.name} key={link.name}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button
                                                type="text"
                                                shape="circle"
                                                icon={<link.icon />}
                                            />
                                        </a>
                                    </Tooltip>
                                ))}
                            </div>
                            <Title level={5}>{COMPANY_NAME}</Title>
                            <Text>Телефон: {COMPANY_PHONE}</Text>
                        </div>
                    </Col>
                    {/* БЛОК 2 - КАТАЛОГ */}
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-block">
                            <Title level={5}>Каталог</Title>
                            <ul className="footer-list">
                                <li>
                                    <Link to="/catalog/item1">Пункт 1</Link>
                                </li>
                                <li>
                                    <Link to="/catalog/item2">Пункт 2</Link>
                                </li>
                                {/* Добавьте остальные пункты каталога */}
                            </ul>
                        </div>
                    </Col>
                    {/* БЛОК 3 - ПРИМЕРЫ РАБОТ */}
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-block">
                            <Title level={5}>Наши работы</Title>
                            <ul className="footer-list">
                                <li>
                                    <Link to="/gallery">Фотогалерея</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    {/* БЛОК 4 - О НАС */}
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-block">
                            <Title level={5}>О нас</Title>
                            <ul className="footer-list">
                                <li>
                                    <Link to="/about/company">О компании</Link>
                                </li>
                                <li>
                                    <Link to="/about/products">О продукции</Link>
                                </li>
                                <li>
                                    <Link to="/cooperation">Сотрудничество</Link>
                                </li>
                                <li>
                                    <Link to="/contacts">Контакты</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout.Footer>
    );
};
