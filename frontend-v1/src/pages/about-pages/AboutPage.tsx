import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import './AboutPage.scss';

const { Content } = Layout;

export const AboutPage: React.FC = () => {
    return (
        <Layout className="about-page-layout">
            {/* Hero Section */}
            {/* <section className="heroSection">
                <h1>О нас</h1>
            </section> */}

            {/* О нашей компании Section */}
            <section className="companySection">
                <div className="overlay" />
                <div className="info-companySection">
                    <h2>О нашей компании</h2>
                </div>
            </section>

            {/* Генеральный директор */}
            <section className="aboutSectionContent">
                <h3 className="subTitle">Строительная компания "ТСН Парк Комфорт"</h3>
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
                            styles={{ body: { textAlign: 'center' } }}
                        >
                            <div style={{ fontWeight: 'bold' }}>
                                Свидетель из Фрязино
                                <br />
                                Генеральный директор
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} md={16}>
                        {/* Текст с выделением нужных фраз */}
                        <Card style={{ background: 'rgba(255,255,255,0.8)' }}>
                            <h3 style={{ color: '#8e3131', fontWeight: 'bold', marginBottom: '8px' }}>
                                Добро пожаловать в ТСН ПАРК КОМФОРТ!{' '}
                            </h3>
                            <p style={{marginBottom: '8px'}}>
                                Ищете идеальное место для жизни с семьей? Наш поселок — это
                                сочетание качественного строительства, комфортной инфраструктуры и
                                доступных условий покупки.
                            </p>
                            <p style={{marginBottom: '8px'}}>
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    Почему выбирают наши дома? Современные дома из баварского
                                    красного кирпича с русским характером.
                                </span>
                            </p>
                            <p style={{marginBottom: '8px'}}>Мы предлагаем два варианта:</p>
                            <p style={{marginBottom: '8px'}}>
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    Дом площадью 110 м²
                                </span>
                                &nbsp;— идеален для семейной жизни. В доме три спальни, просторная
                                кухня-гостиная, санузлы с готовой сантехникой.
                            </p>
                            <p style={{marginBottom: '8px'}}>
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    Дом площадью 88 м²
                                </span>
                                &nbsp;— компактный, но функциональный. Уютные спальни,
                                кухня-гостиная и продуманные детали планировки делают его отличным
                                выбором для небольших семей. Каждый дом построен с учётом
                                современных стандартов качества и удобства под соблюдением
                                экспертов.
                            </p>

                            <p style={{marginBottom: '8px'}}>Современные технические решения:</p>

                            <p style={{marginBottom: '8px'}}>
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    Четырехскатная крыша
                                </span>
                                &nbsp;из металлочерепицы, оснащенная системой снегозадержания и
                                надежной водосточной системой.
                            </p>

                            <p style={{marginBottom: '8px'}}>
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    Металлическая дверь с терморазрывом
                                </span>
                                &nbsp;для надежности и теплоизоляции, обеспечивающая защиту от
                                перепадов температуры.
                            </p>

                            <p style={{marginBottom: '8px'}}>
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    Теплые полы и радиаторы отопления
                                </span>
                                &nbsp;обеспечивают уют и комфорт в любое время года. Установлен
                                двухконтурный газовый котел для отопления и горячего водоснабжения.
                                Заведено электричество 15 кВт, чтобы покрыть любые ваши потребности.
                            </p>

                            <p style={{marginBottom: '8px'}}>
                                По периметру дома выполнена бетонная отмостка, защищающая фундамент
                                и добавляющая аккуратный внешний вид.&nbsp;
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    Земельные участки.
                                </span>
                                &nbsp;Просторные участки площадью 9 соток, огражденные забором,
                                предоставляют возможность для обустройства сада, зоны отдыха или
                                площадки для детей.
                            </p>

                            <p style={{marginBottom: '8px'}}>
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    Инфраструктура и природа:
                                </span>
                                &nbsp;Жизнь в нашем поселке — это чистый воздух, живописные виды,
                                прогулочные зоны, а также рядом с поселком находится автобусная
                                остановка. В ближайших планах — строительство торгового&nbsp;
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    центра и детской площадки,
                                </span>
                                &nbsp;чтобы всё необходимое было под рукой.
                            </p>
                            <p style={{marginBottom: '8px'}}>
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    Выгодные условия покупки.
                                </span>
                                &nbsp;Продажа домов напрямую от застройщика, без посредников.
                                Доступна&nbsp;
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    ипотека
                                </span>
                                &nbsp;и использование&nbsp;
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    материнского капитала
                                </span>
                                , чтобы сделать покупку максимально доступной.
                            </p>
                            <p style={{marginBottom: '8px'}}>
                                <span style={{ color: '#8e3131', fontWeight: 'bold' }}>
                                    Приглашаем вас на экскурсию в наш поселок, чтобы лично убедиться
                                    в преимуществах наших домов и инфраструктуры.
                                </span>
                                &nbsp;Здесь начинается ваш новый этап жизни — комфортный, надёжный и
                                уютный!
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
                    <div className="companyDescription">
                        <Row
                            gutter={[32, 32]}
                            justify="space-between"
                            align="top"
                            className="valuesRow"
                        >
                            <Col xs={24} md={8} className="valueCol">
                                <h3 style={{ fontSize: '18px' }}>Готовые дома</h3>
                                <p style={{ fontSize: '18px' }}>
                                    Вы приобретаете уже построенные теплые дома с огороженным
                                    участком 9 соток, в перспективном строящемся поселке. Осталось
                                    лишь обновить интерьер по своему усмотрению и радоваться жизни.
                                </p>
                            </Col>
                            <Col xs={24} md={8} className="valueCol">
                                <h3 style={{ fontSize: '18px' }}>Центральные коммуникации</h3>
                                <p style={{ fontSize: '18px' }}>
                                    К вашему дому уже подведены все необходимые центральные
                                    коммуникации: центральное водоснабжение, газоснабжение,
                                    электричество. Также есть возможность подключения
                                    высокоскоростного интернета.
                                </p>
                            </Col>
                            <Col xs={24} md={8} className="valueCol">
                                <h3 style={{ fontSize: '18px' }}>Дома с предчистовой отделкой</h3>
                                <p style={{ fontSize: '18px' }}>
                                    Мы позаботились о вашем времени и выполнили уже все за вас:
                                    отшпаклеванные стены, проводка, розетки с выключателями, система
                                    отопления, разводка по сантехнике и установленный газовый котел.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
        </Layout>
    );
};
