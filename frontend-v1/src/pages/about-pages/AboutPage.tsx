import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import './AboutPage.scss';

const { Content } = Layout;

export const AboutPage: React.FC = () => {
    return (
        <Layout className="about-page-layout">
            {/* Hero Section */}
            <section className="heroSection">
                <h1>О нас</h1>
            </section>

            {/* О нашей компании Section */}
            <section className="companySection">
                <div className="overlay" />
                <div className="info-companySection">
                    <h2>О нашей компании</h2>
                </div>
            </section>

            {/* Генеральный директор */}
            <section className="aboutSectionContent">
                <h3 className="subTitle">Строительная компания "Парк-комфорт"</h3>
                <Row gutter={[20, 20]} className="aboutSection-inner">
                    <Col xs={24} md={8} className="aboutSection-imageWrap">
                        <Card
                            hoverable
                            cover={
                                <img
                                    src="src/assets/image2.png"
                                    alt="Свидетель из Фрязино"
                                    style={{ borderRadius: '10px 10px 0 0' }}
                                />
                            }
                            style={{ borderRadius: '10px', overflow: 'hidden' }}
                            styles={{body: { textAlign: 'center' }}}
                        >
                            <div style={{ fontWeight: 'bold' }}>
                                Свидетель из Фрязино
                                <br />
                                Генеральный директор
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} md={16}>
                        <Card style={{ background: 'rgba(255,255,255,0.8)' }}>
                            <p>
                                Строительная компания “Парк-комфорт” – ... (Описание компании) ...
                            </p>
                        </Card>
                    </Col>
                </Row>
            </section>

            {/* Наши ценности Section */}
            <section className="companySection">
                <div className="overlay" />
                <div className="info-companySection">
                    <h2>Наши ценности</h2>
                    <div className="companyDescription">Описание ценностей компании...</div>
                </div>
            </section>

            {/* Наша команда Section */}
            {/* <section className="teamSection">
                <h2 className="sectionTitle">Наша команда</h2>
                <Row gutter={[20, 20]} justify="center">
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    src="src/assets/image2.png"
                                    alt="Свидетель из Фрязино"
                                    style={{ borderRadius: '10px 10px 0 0' }}
                                />
                            }
                            style={{ borderRadius: '10px', overflow: 'hidden' }}
                            bodyStyle={{ textAlign: 'center' }}
                        >
                            <strong>Свидетель из Фрязино</strong>
                            <br />
                            Генеральный директор
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    src="src/assets/image2.png"
                                    alt="Школьник в болоте"
                                    style={{ borderRadius: '10px 10px 0 0' }}
                                />
                            }
                            style={{ borderRadius: '10px', overflow: 'hidden' }}
                            bodyStyle={{ textAlign: 'center' }}
                        >
                            <strong>Школьник в болоте</strong>
                            <br />
                            Менеджер по ... (указать должность)
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    src="src/assets/image2.png"
                                    alt="Важный Ши Фу"
                                    style={{ borderRadius: '10px 10px 0 0' }}
                                />
                            }
                            style={{ borderRadius: '10px', overflow: 'hidden' }}
                            bodyStyle={{ textAlign: 'center' }}
                        >
                            <strong>Важный Ши Фу</strong>
                            <br />
                            Бригадир
                        </Card>
                    </Col>
                </Row>
            </section> */}
        </Layout>
    );
};
