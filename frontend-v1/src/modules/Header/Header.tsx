// Header.tsx
import { useNavigate } from 'react-router-dom';
import { Button, Layout, Space } from 'antd';
import './Header.scss';

export const Header = () => {
    const navigate = useNavigate();

    return (
        <Layout.Header className="header">
            <div className="header__container">
                {/* Левая часть: Логотип */}
                <div className="header__left" onClick={() => navigate('/')}>
                    Логотип компании
                </div>

                {/* Центральная часть: Навигационные кнопки */}
                <div className="header__center">
                    <Space.Compact>
                        <Button
                            type="text"
                            className="header__nav-button"
                            onClick={() => navigate('/catalog')}
                        >
                            Каталог
                        </Button>
                        <Button
                            type="text"
                            className="header__nav-button"
                            onClick={() => navigate('/projects')}
                        >
                            Наши проекты
                        </Button>
                        <Button
                            type="text"
                            className="header__nav-button"
                            onClick={() => navigate('/about')}
                        >
                            О нас
                        </Button>
                        <Button
                            type="text"
                            className="header__nav-button"
                            onClick={() => navigate('/services')}
                        >
                            Услуги
                        </Button>
                        <Button
                            type="text"
                            className="header__nav-button"
                            onClick={() => navigate('/contacts')}
                        >
                            Контакты
                        </Button>
                    </Space.Compact>
                </div>

                {/* Правая часть: Номер телефона и кнопка "Заказать звонок" */}
                <div className="header__right">
                    <span className="header__phone">+7 (123) 456-78-90</span>
                    <span className="header__separator">|</span>
                    <Button
                        type="text"
                        className="header__call-button"
                        onClick={() => navigate('/request-call')}
                    >
                        Заказать звонок
                    </Button>
                </div>
            </div>
        </Layout.Header>
    );
};
