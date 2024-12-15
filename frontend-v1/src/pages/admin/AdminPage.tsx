// src/pages/admin/AdminPage.tsx

import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import './AdminPage.scss';

import BuildingsManagement from './BuildingsManagement';
import ProjectsManagement from './ProjectsManagement';
import ServicesManagement from './ServicesManagement';

const { Sider, Content } = Layout;

const AdminPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'buildings' | 'projects' | 'services'>(
        'buildings'
    );

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

    return (
        <Layout className="admin-page">
            <Sider className="admin-page__sidebar" width={200}>
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
            </Sider>
            <Content className="admin-page__content">{renderSection()}</Content>
        </Layout>
    );
};

export default AdminPage;
