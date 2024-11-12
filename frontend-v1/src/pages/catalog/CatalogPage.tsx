import { Card, Typography } from 'antd';
import './CatalogPage.scss';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

export const CatalogPage = () => {
    const projects = [
        {
            title: 'Дом в классическом стиле',
            description:
                'Просторный двухэтажный дом в классическом стиле с большой террасой и садом.',
            image: 'https://placehold.co/600x400'
        },
        {
            title: 'Современный коттедж',
            description:
                'Современный дом с большими панорамными окнами и минималистичным дизайном.',
            image: 'https://placehold.co/600x400'
        },
        {
            title: 'Дом в скандинавском стиле',
            description: 'Одноэтажный дом в скандинавском стиле с просторной гостиной и камином.',
            image: 'https://placehold.co/600x400'
        }
    ];

    return (
        <div className="catalog-page">
            <Title level={1} className="catalog-title">
                Каталог проектов
            </Title>
            <div className="catalog-list">
                {projects.map((project, index) => (
                    <Card
                        key={index}
                        hoverable
                        cover={<img alt={project.title} src={project.image} />}
                        className="catalog-card"
                    >
                        <Meta title={project.title} description={project.description} />
                    </Card>
                ))}
            </div>
        </div>
    );
};
