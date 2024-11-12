import { useNavigate } from 'react-router-dom';
import { Button, Flex, Layout, Space } from 'antd';
import './Header.scss';

export const Header = () => {
    const navigate = useNavigate();

    return (
        <Layout.Header className="header">
            <div className="header__container">
                <div className="header__left" onClick={() => navigate('/')}>
                    Логотип компании
                </div>
                <Flex gap={5} align="center" justify="center" className="header__center">
                    <Space.Compact>
                        <Button type="text" onClick={() => navigate('/catalog')}>
                            Каталог
                        </Button>
                        <Button type="text" onClick={() => navigate('/gallery')}>
                            Наши работы
                        </Button>
                        <Button type="text" onClick={() => navigate('/about/company')}>
                            О нас
                        </Button>
                        <Button type="text" onClick={() => navigate('/contacts')}>
                            Услуги
                        </Button>
                        <Button type="text" onClick={() => navigate('/contacts')}>
                            Контакты
                        </Button>
                    </Space.Compact>
                </Flex>
            </div>
        </Layout.Header>
    );
};
