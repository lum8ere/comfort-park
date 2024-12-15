// src/pages/admin/ProjectsManagement.tsx

import React, { useEffect, useState } from 'react';
import {
    Table,
    Form,
    Input,
    Button,
    Upload,
    notification,
    Modal
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks';
import { selectProjects } from 'store/slices/projects/projectSelectors';
import axios from '../../service/axiosConfig';
import { fetchProjects } from 'store/slices/projects/projectsSlice';

const ProjectsManagement: React.FC = () => {
    const dispatch = useAppDispatch();
    const projects = useSelector(selectProjects);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reviews, setReviews] = useState<
        { first_name: string; last_name: string; comment: string; photos: any[] }[]
    >([]);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const columns = [
        { title: 'Название проекта', dataIndex: 'name', key: 'name' },
        { title: 'Описание', dataIndex: 'description', key: 'description' },
        {
            title: 'Отзывы',
            dataIndex: 'reviews',
            key: 'reviews',
            render: (reviews: any[]) => reviews?.length || 0
        }
    ];

    const onAddReview = () => {
        setReviews([...reviews, { first_name: '', last_name: '', comment: '', photos: [] }]);
    };

    const onRemoveReview = (index: number) => {
        const updatedReviews = reviews.slice();
        updatedReviews.splice(index, 1);
        setReviews(updatedReviews);
    };

    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);

            // Добавление фотографий проекта
            if (values.photos && values.photos.length > 0) {
                values.photos.forEach((file: any) => {
                    formData.append('photos', file.originFileObj);
                });
            }

            // Формируем массив отзывов
            const formattedReviews = reviews.map((review) => ({
                first_name: review.first_name,
                last_name: review.last_name,
                comment: review.comment
            }));
            formData.append('reviews', JSON.stringify(formattedReviews));

            // Добавление фотографий для отзывов
            reviews.forEach((review, index) => {
                review.photos.forEach((file: any) => {
                    formData.append(`review_photos_${index}`, file.originFileObj);
                });
            });

            await axios.post('/prod/projects', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            notification.success({ message: 'Проект успешно добавлен' });
            form.resetFields();
            setReviews([]);
            setIsModalVisible(false);
        } catch (error) {
            notification.error({ message: 'Ошибка при добавлении проекта' });
        }
    };

    return (
        <div>
            <h2>Управление проектами</h2>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>Добавить проект</Button>
            <Table columns={columns} dataSource={projects} rowKey="id" style={{ marginTop: 16 }} />

            <Modal
                title="Добавить проект"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={600}
            >
                <Form form={form} name="projects" layout="vertical" onFinish={onFinish}>
                    <Form.Item name="name" label="Название проекта" rules={[{ required: true }]}>
                        <Input placeholder="Введите название проекта" />
                    </Form.Item>
                    <Form.Item name="description" label="Описание">
                        <Input.TextArea rows={4} placeholder="Введите описание проекта" />
                    </Form.Item>
                    <Form.Item
                        name="photos"
                        label="Фото"
                        valuePropName="fileList"
                        getValueFromEvent={(e: any) =>
                            Array.isArray(e.fileList) ? e.fileList : []
                        }
                    >
                        <Upload beforeUpload={() => false} multiple listType="picture">
                            <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                        </Upload>
                    </Form.Item>
                    <div style={{ marginBottom: 16 }}>
                        <h3>Отзывы</h3>
                        {reviews.map((review, index) => (
                            <div key={index} style={{ marginBottom: 16, border: '1px solid #f0f0f0', padding: '8px' }}>
                                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                    <Input
                                        placeholder="Имя"
                                        value={review.first_name}
                                        onChange={(e) => {
                                            const updatedReviews = [...reviews];
                                            updatedReviews[index].first_name = e.target.value;
                                            setReviews(updatedReviews);
                                        }}
                                        style={{ flex: 1 }}
                                    />
                                    <Input
                                        placeholder="Фамилия"
                                        value={review.last_name}
                                        onChange={(e) => {
                                            const updatedReviews = [...reviews];
                                            updatedReviews[index].last_name = e.target.value;
                                            setReviews(updatedReviews);
                                        }}
                                        style={{ flex: 1 }}
                                    />
                                </div>
                                <Input.TextArea
                                    placeholder="Комментарий"
                                    value={review.comment}
                                    onChange={(e) => {
                                        const updatedReviews = [...reviews];
                                        updatedReviews[index].comment = e.target.value;
                                        setReviews(updatedReviews);
                                    }}
                                    rows={2}
                                    style={{ marginBottom: 8 }}
                                />
                                <div>
                                    <span style={{ display: 'block', marginBottom: 4 }}>Фото отзыва:</span>
                                    <Upload
                                        beforeUpload={() => false}
                                        multiple
                                        listType="picture"
                                        fileList={review.photos}
                                        onChange={({ fileList }) => {
                                            const updatedReviews = [...reviews];
                                            updatedReviews[index].photos = fileList;
                                            setReviews(updatedReviews);
                                        }}
                                    >
                                        <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                                    </Upload>
                                </div>
                                <Button danger onClick={() => onRemoveReview(index)} style={{ marginTop: 8 }}>
                                    Удалить отзыв
                                </Button>
                            </div>
                        ))}
                        <Button icon={<PlusOutlined />} onClick={onAddReview}>
                            Добавить отзыв
                        </Button>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => setIsModalVisible(false)}>
                            Отмена
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProjectsManagement;
