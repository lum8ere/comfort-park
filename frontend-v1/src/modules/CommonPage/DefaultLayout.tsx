import { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import { Footer } from 'modules/Footer/Footer';
import { Header } from 'modules/Header/Header';

const { Content } = Layout;

interface DefaultLayoutProps extends PropsWithChildren {}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout style={{ position: 'relative' }}>
                <Header />
            </Layout>
            <Content>{children}</Content>
            <Footer />
        </Layout>
    );
};
