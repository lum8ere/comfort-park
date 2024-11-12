import React from 'react';
import { Typography } from 'antd';
import './AboutPage.scss';

const { Title, Paragraph } = Typography;

export const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <Title level={1}>О нашей компании</Title>
        <Paragraph>
          С 2010 года мы строим дома, о которых мечтают наши клиенты. Наша компания предоставляет полный цикл строительства — от проектирования до отделки. Мы гордимся своей репутацией и сотнями довольных клиентов, доверивших нам создание уютного жилья.
        </Paragraph>
      </section>
      <section className="about-values">
        <Title level={2}>Наши ценности</Title>
        <Paragraph>
          Мы придерживаемся высоких стандартов качества, честности и прозрачности на всех этапах сотрудничества. В нашей работе важны доверие и понимание потребностей клиентов. Мы гарантируем качество выполнения каждой детали проекта.
        </Paragraph>
      </section>
      <section className="about-team">
        <Title level={2}>Наша команда</Title>
        <Paragraph>
          Наша команда состоит из опытных архитекторов, инженеров и строителей. Мы уверены, что сильная команда — это основа любого успешного проекта. Наши специалисты обладают многолетним опытом и профессиональными навыками, чтобы обеспечить высочайшее качество строительства.
        </Paragraph>
      </section>
    </div>
  );
};