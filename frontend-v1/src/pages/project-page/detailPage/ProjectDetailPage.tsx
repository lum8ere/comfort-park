import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Image, List, Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useAppDispatch } from 'store/hooks';
import { fetchProject } from 'store/slices/projects/projectSlice';
import { selectProjectById } from 'store/slices/projects/projectSelectors';
import { Loader } from 'ui/Loader/Loader';

import './ProjectDetailPage.scss';
import { ChartArea, HouseSize, Price, StairsFloor } from 'assets/card';
import { parsePhotos } from 'ui/utils/parsePhotos';

const { Title, Paragraph } = Typography;
const { PreviewGroup } = Image;

export const ProjectDetailPage = () => {
    const { id } = useParams<{ id: string }>(); // Получаем ID из URL
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
    const dispatch = useAppDispatch();

    const { loading, error } = useSelector((state: RootState) => state.project);
    const project = useSelector(selectProjectById);

    useEffect(() => {
        if (id) {
            dispatch(fetchProject(id));
        }
    }, [dispatch, id]);

    const reloadProject = () => {
        if (id) {
            dispatch(fetchProject(id));
        }
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
                    К сожалению, не удалось загрузить товар. Попробуйте обновить страницу или
                    повторить попытку.
                </Paragraph>
                <Button type="primary" onClick={reloadProject}>
                    Повторить попытку
                </Button>
            </div>
        );
    }

    const photos = project?.ProjectPhoto || [];
    const mainPhoto = photos[selectedPhotoIndex];
    const reviews = project?.ProjectReview || [];

    return (
        <div className="catalog-detail-page">
            <Title level={1} className="catalog-detail-title">
                {project?.name}
            </Title>
            <div className="catalog-detail-container">
                <div className="catalog-detail-left">
                    {photos.length > 0 && (
                        <div className="photo-gallery">
                            <PreviewGroup>
                                <div className="main-photo-wrapper">
                                    <Image
                                        src={mainPhoto.url}
                                        alt={`Изображение ${selectedPhotoIndex + 1}`}
                                        className="main-photo"
                                        preview={{
                                            mask: false
                                        }}
                                    />
                                </div>
                                {photos.length > 1 && (
                                    <div className="thumbnails">
                                        {photos.map((photo, index) => {
                                            if (index === selectedPhotoIndex) return null;
                                            return (
                                                <div
                                                    key={index}
                                                    className="thumbnail-wrapper"
                                                    onClick={() => setSelectedPhotoIndex(index)}
                                                >
                                                    <Image
                                                        src={photo.url}
                                                        alt={`Миниатюра ${index + 1}`}
                                                        className="thumbnail"
                                                        preview={false}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </PreviewGroup>
                        </div>
                    )}
                </div>
                <div className="catalog-detail-right">
                    <div className="characteristics-block">
                        <Title level={4}>Описание проекта</Title>
                        <Paragraph>{project?.description}</Paragraph>
                    </div>
                </div>
                <div className="catalog-detail-right">
                    <div className="reviews-block">
                        <Title level={4}>Отзывы</Title>
                        {reviews.length > 0 ? (
                            <List
                                itemLayout="vertical"
                                dataSource={reviews}
                                renderItem={(review) => (
                                    <Card className="review-card" key={review.id}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    icon={<UserOutlined />}
                                                    style={{ backgroundColor: '#8e3131' }}
                                                />
                                            }
                                            title={`${review.first_name} ${review.last_name}`}
                                            description={new Date(review.created_at).toLocaleDateString()}
                                        />
                                        <Paragraph>{review.comment}</Paragraph>
                                        {review.photos.length > 0 && (
                                            <Image.PreviewGroup>
                                                <div className="review-photos">
                                                    {parsePhotos(review.photos).map((photoUrl, idx) => {
                                                        return (
                                                            <Image
                                                            key={idx}
                                                            src={photoUrl}
                                                            alt={`Отзыв фото ${idx + 1}`}
                                                            width={100}
                                                            style={{ marginRight: '10px' }}
                                                        />
                                                        )
                                                    })}
                                                </div>
                                            </Image.PreviewGroup>
                                        )}
                                    </Card>
                                )}
                            />
                        ) : (
                            <Paragraph>Отзывов пока нет. Будьте первым!</Paragraph>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
