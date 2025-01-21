import React, { useState } from 'react';
import { Menu, Layout, Grid, Drawer } from 'antd';
import './AdminPage.scss';
import BuildingsManagement from './BuildingsManagement';
import ProjectsManagement from './ProjectsManagement';
import ServicesManagement from './ServicesManagement';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/auth/authSlice';

const { Sider, Content, Header } = Layout;
const { useBreakpoint } = Grid;

const AdminPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'buildings' | 'projects' | 'services'>('buildings');
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const screens = useBreakpoint();

    const renderSection = () => {
        switch (activeSection) {
            case 'buildings':
                return <BuildingsManagement />;
            case 'services':
                return <ServicesManagement />;
            default:
                return <div>Выберите раздел для управления</div>;
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const menuItems = [
        {
            key: 'buildings',
            label: 'Управление зданиями',
        },
        {
            key: 'services',
            label: 'Управление услугами',
        },
        
    ];

    const menu = (
        <Menu
            mode="inline"
            selectedKeys={[activeSection]}
            onClick={({ key }) =>
                setActiveSection(key as 'buildings' | 'services')
            }
            items={menuItems}
        />
    );

    // Для мобильных устройств используем Drawer вместо Sider
    const isMobile = !screens.md; // md = 768px, можно менять по вкусу

    return (
        <Layout className="admin-page" style={{ minHeight: '100vh' }}>
            {isMobile ? (
                <>
                    <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
                        <MenuOutlined onClick={() => setMobileMenuVisible(true)} />
                        <h1 style={{ marginLeft: 16 }}>Админ-панель</h1>
                        <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Выйти</span>
                    </Header>
                    <Drawer
                        open={mobileMenuVisible} // Заменили 'visible' на 'open'
                        onClose={() => setMobileMenuVisible(false)}
                        placement="left"
                    >
                        {menu}
                    </Drawer>
                </>
            ) : (
                <Sider className="admin-page__sidebar" width={200} style={{ background: '#fff' }}>
                    {menu}
                    <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Выйти</span>
                </Sider>
            )}
            <Layout>
                <Content className="admin-page__content" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
                    {renderSection()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
