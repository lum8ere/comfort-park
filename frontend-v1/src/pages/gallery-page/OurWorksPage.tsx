import { Typography, Image } from 'antd';
import './OurWorksPage.scss';

const { Title, Paragraph } = Typography;

export const OurWorksPage = () => {
    const works = [
        {
            title: 'Коттедж в современном стиле',
            image: 'https://placehold.co/600x400'
        },
        {
            title: 'Классический загородный дом',
            image: 'https://placehold.co/600x400'
        },
        {
            title: 'Дом в стиле хай-тек',
            image: 'https://placehold.co/600x400'
        },
        {
            title: 'Скандинавский коттедж',
            image: 'https://placehold.co/600x400'
        },
        {
            title: 'Дом с террасой',
            image: 'https://placehold.co/600x400'
        },
        {
            title: 'Проект деревянного дома',
            image: 'https://placehold.co/600x400'
        }
    ];

    return (
        <div className="our-works-page">
            <Title level={1} className="works-title">
                Наши работы
            </Title>
            <Paragraph className="works-description">
                Мы гордимся выполненными проектами и представляем вашему вниманию некоторые из наших
                лучших работ.
            </Paragraph>
            <div className="works-gallery">
                {works.map((work, index) => (
                    <div key={index} className="work-item">
                        <Image
                            src={work.image}
                            alt={work.title}
                            className="work-image"
                            preview={false}
                        />
                        <Title level={4} className="work-title">
                            {work.title}
                        </Title>
                    </div>
                ))}
            </div>
        </div>
    );
};
