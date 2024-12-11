import { NotFoundPage } from 'components/notFound/notFound';
import { AboutPage } from 'pages/about-pages/AboutPage';
import { CatalogPage } from 'pages/catalog/CatalogPage';
import { CatalogDetailPage } from 'pages/catalogDetailPage/CatalogDetailPage';
import { OurWorksPage } from 'pages/gallery-page/OurWorksPage';
import { HomePage } from 'pages/home-page/HomePage';
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
        path: '/gallery',
        component: OurWorksPage
    }
];
