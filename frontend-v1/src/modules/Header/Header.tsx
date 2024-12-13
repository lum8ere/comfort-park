import { useNavigate } from 'react-router-dom';
import { Button, Layout, Space, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './Header.scss';

export const Header = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navItems = [
        { label: 'Каталог', path: '/catalog' },
        { label: 'Наши проекты', path: '/projects' },
        { label: 'О нас', path: '/about' },
        { label: 'Услуги', path: '/services' },
        { label: 'Контакты', path: '/contacts' }
    ];

    return (
        <Layout.Header className="header">
            <div className="header__container">
                {/* Левая часть: Логотип */}
                <div className="header__left" onClick={() => navigate('/')}>
                    Парк-комфорт
                </div>

                {/* Центральная часть: Навигационные кнопки (на больших экранах) */}
                <div className="header__center">
                    <Space.Compact>
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                type="text"
                                className="header__nav-button"
                                onClick={() => navigate(item.path)}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Space.Compact>
                </div>

                {/* Правая часть: Номер телефона и кнопка "Заказать звонок" (на больших экранах) */}
                <div className="header__right">
                    <span className="header__phone">+7 (123) 456-78-90</span>
                    <span className="header__separator">|</span>
                    <Button
                        type="text"
                        className="header__call-button"
                        // onClick={() => navigate('/request-call')}
                    >
                        Заказать звонок
                    </Button>
                </div>

                {/* Бургер-иконка для мобильной версии */}
                <div className="header__burger" onClick={() => setIsDrawerOpen(true)}>
                    <MenuOutlined />
                </div>

                {/* Drawer для мобильной навигации */}
                <Drawer
                    title="Меню"
                    placement="right"
                    onClose={() => setIsDrawerOpen(false)}
                    open={isDrawerOpen}
                >
                    {navItems.map((item) => (
                        <Button
                            key={item.path}
                            type="text"
                            className="header__nav-button"
                            onClick={() => {
                                navigate(item.path);
                                setIsDrawerOpen(false);
                            }}
                            block
                        >
                            {item.label}
                        </Button>
                    ))}

                    {/* Внизу Drawer – телефон и кнопка "Заказать звонок" на мобильных */}
                    <div className="drawer__footer">
                        <div className="drawer__phone">+7 (123) 456-78-90</div>
                        <Button
                            type="text"
                            className="drawer__call-button"
                            onClick={() => {
                                // navigate('/request-call');
                                setIsDrawerOpen(false);
                            }}
                            block
                        >
                            Заказать звонок
                        </Button>
                    </div>
                </Drawer>
            </div>
        </Layout.Header>
    );
};
