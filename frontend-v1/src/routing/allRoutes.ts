import { NotFoundPage } from "components/notFound/notFound";
import { RoutesType } from "routing/routesTypes";


export const baseRoutes: RoutesType[] = [
    {
        path: '/',
        component: NotFoundPage
    }
];