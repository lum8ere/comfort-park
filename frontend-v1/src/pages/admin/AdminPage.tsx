// src/pages/admin/AdminPage.tsx

import React, { useState } from 'react';
import { Menu, Layout, Grid, Drawer } from 'antd';
import './AdminPage.scss';
import BuildingsManagement from './BuildingsManagement';
import ProjectsManagement from './ProjectsManagement';
import ServicesManagement from './ServicesManagement';
import { MenuOutlined } from '@ant-design/icons';

const { Sider, Content, Header } = Layout;
const { useBreakpoint } = Grid;

const AdminPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'buildings' | 'projects' | 'services'>('buildings');
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const screens = useBreakpoint();

    const renderSection = () => {
        switch (activeSection) {
            case 'buildings':
                return <BuildingsManagement />;
            case 'projects':
                return <ProjectsManagement />;
            case 'services':
                return <ServicesManagement />;
            default:
                return <div>Выберите раздел для управления</div>;
        }
    };

    const menu = (
        <Menu
            mode="inline"
            selectedKeys={[activeSection]}
            onClick={({ key }) =>
                setActiveSection(key as 'buildings' | 'projects' | 'services')
            }
        >
            <Menu.Item key="buildings">Управление зданиями</Menu.Item>
            <Menu.Item key="projects">Управление проектами</Menu.Item>
            <Menu.Item key="services">Управление услугами</Menu.Item>
        </Menu>
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
                    </Header>
                    <Drawer
                        visible={mobileMenuVisible}
                        onClose={() => setMobileMenuVisible(false)}
                        placement="left"
                        bodyStyle={{ padding: 0 }}
                    >
                        {menu}
                    </Drawer>
                </>
            ) : (
                <Sider className="admin-page__sidebar" width={200} style={{ background: '#fff' }}>
                    {menu}
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
