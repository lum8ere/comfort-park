import { Button, Flex, Layout, Space } from 'antd';
import './Header.scss';

export const Header = () => {
    return (
        <Layout.Header className="header">
            <div className="header__container">
                <div className="header__left">Логотип компании</div>
                <Flex gap={5} align="center" justify="center" className="header__center">
                    <Space.Compact>
                        <Button type="text">Каталог</Button>
                        <Button type="text">Наши работы</Button>
                        <Button type="text">О нас</Button>
                        <Button type="text">Услуги</Button>
                        <Button type="text">Контакты</Button>
                    </Space.Compact>
                </Flex>
            </div>
        </Layout.Header>
    );
};
