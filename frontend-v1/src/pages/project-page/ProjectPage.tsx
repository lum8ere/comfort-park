import { memo, useEffect, useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchServices } from 'store/slices/services/servicesSlice';
import { useAppDispatch } from 'store/hooks';
import { Loader } from 'ui/Loader/Loader';
import { ServiceCard } from 'components/card/service/ServiceCard';
import { selectProjectsOnPage } from 'store/slices/projects/projectSelectors';

import './ProjectPage.scss';
import { fetchProjects } from 'store/slices/projects/projectsSlice';

const { Title, Paragraph } = Typography;

export const ProjectPage = memo(() => {
    const dispatch = useAppDispatch();

    // Селектор для получения всех зданий
    const projects = useSelector(selectProjectsOnPage);
    const { loading, error } = useSelector((state: RootState) => state.services);

        // Загрузить данные при монтировании компонента
    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    console.log(projects)


    const reloadSerivce = () => {
        dispatch(fetchServices());
    };

    if (loading)
        return (
            <div className="centered-content">
                <Loader />
            </div>
        );

    if (error) {
        return (
            <div className="centered-content">
                <Title level={3}>Ошибка загрузки данных</Title>
                <Paragraph>
                    К сожалению, не удалось загрузить каталог. Попробуйте обновить страницу или
                    повторить попытку.
                </Paragraph>
                <Button type="primary" onClick={reloadSerivce}>
                    Повторить попытку
                </Button>
            </div>
        );
    }

    return (
        <div className="service-page">
            <section className="service-title">
                <h1>Готовые проекты и отзывы</h1>
            </section>

            <Row gutter={[16, 16]} style={{ justifyContent: 'center' }}>
                {projects.map((project) => (
                    <Col
                        key={project.id}
                        xs={24} // на мобильных устройствах 1 карточка в ряд
                        sm={12} // на планшетах 2 карточки в ряд
                        md={8} // на десктопах 3 карточки в ряд
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        {/* <ServiceCard imageURL={project.projectPhoto[0].url} name={project.name} /> */}
                    </Col>
                ))} 
            </Row>
        </div>
    );
});
