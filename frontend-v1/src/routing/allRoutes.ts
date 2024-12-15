import { NotFoundPage } from 'components/NotFound';
import { AboutPage } from 'pages/about-pages/AboutPage';
import AdminPage from 'pages/admin/AdminPage';
import { CatalogPage } from 'pages/catalog/CatalogPage';
import { CatalogDetailPage } from 'pages/catalogDetailPage/CatalogDetailPage';
import { ContactPage } from 'pages/contact-page/contactPage';
import { HomePage } from 'pages/home-page/HomePage';
import { ProjectDetailPage } from 'pages/project-page/detailPage/ProjectDetailPage';
import { ProjectPage } from 'pages/project-page/ProjectPage';
import { ServicePage } from 'pages/service-page/ServicePage';
import { RoutesType } from 'routing/routesTypes';

export const baseRoutes: RoutesType[] = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/about',
        component: AboutPage
    },
    {
        path: '/catalog',
        component: CatalogPage
    },
    {
        path: '/catalog/:id',
        component: CatalogDetailPage
    },
    {
        path: '/projects',
        component: ProjectPage
    },
    {
        path: '/services',
        component: ServicePage
    },
    {
        path: '/services/:id',
        component: ProjectDetailPage
    },
    {
        path: '/contacts',
        component: ContactPage
    },
    {
        path: '/admin',
        component: AdminPage,
        protected: true // Маршрут защищён
    },
    {
        path: '/404',
        component: NotFoundPage
    },
    {
        path: '*',
        component: NotFoundPage
    }
];
