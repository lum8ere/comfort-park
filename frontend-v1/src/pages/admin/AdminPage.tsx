// src/pages/admin/AdminPage.tsx

import React, { useState } from 'react';
import {
    Menu,
    Layout,
    Form,
    Input,
    Button,
    InputNumber,
    Checkbox,
    Upload,
    notification
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import axios from '../../service/axiosConfig';
import './AdminPage.scss';

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

const BuildingsManagement: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('size', values.size);
            formData.append('floors', values.floors);
            formData.append('area', values.area);
            formData.append('description', values.description);
            formData.append('bange', values.bange);

            if (values.photos && values.photos.length > 0) {
                values.photos.forEach((file: any) => {
                    formData.append('photos', file.originFileObj);
                });
            }

            formData.append('price', values.price);
            formData.append('is_active', values.isActive ? 'true' : 'false');

            await axios.post('/prod/buildings', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            notification.success({ message: 'Здание успешно добавлено' });
            form.resetFields();
        } catch (error) {
            notification.error({ message: 'Ошибка при добавлении здания' });
        }
    };

    return (
        <div>
            <h2>Управление зданиями</h2>
            <Form form={form} name="buildings" layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Название здания" rules={[{ required: true }]}>
                    <Input placeholder="Введите название здания" />
                </Form.Item>
                <Form.Item name="size" label="Размер">
                    <Input placeholder="Введите размер здания" />
                </Form.Item>
                <Form.Item name="floors" label="Этажность" rules={[{ required: true }]}>
                    <InputNumber min={1} placeholder="Введите количество этажей" />
                </Form.Item>
                <Form.Item name="area" label="Площадь" rules={[{ required: true }]}>
                    <InputNumber min={0} placeholder="Введите площадь здания" />
                </Form.Item>
                <Form.Item name="description" label="Описание">
                    <Input.TextArea rows={4} placeholder="Введите описание" />
                </Form.Item>
                <Form.Item name="bange" label="Баннер">
                    <Input placeholder="Введите баннер как строку" />
                </Form.Item>
                <Form.Item
                    name="photos"
                    label="Фото"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => (Array.isArray(e.fileList) ? e.fileList : [])}
                >
                    <Upload beforeUpload={() => false} multiple listType="picture">
                        <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
                    <InputNumber min={0} placeholder="Введите цену" />
                </Form.Item>
                <Form.Item name="isActive" valuePropName="checked">
                    <Checkbox>Активно</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Добавить здание
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const ProjectsManagement: React.FC = () => {
    const [form] = Form.useForm();
    const [reviews, setReviews] = useState<
        { first_name: string; last_name: string; comment: string; photos: any[] }[]
    >([]);

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
            const formattedReviews = reviews.map((review, index) => {
                return {
                    first_name: review.first_name,
                    last_name: review.last_name,
                    comment: review.comment
                };
            });
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
        } catch (error) {
            notification.error({ message: 'Ошибка при добавлении проекта' });
        }
    };

    return (
        <div>
            <h2>Управление проектами</h2>
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
                    getValueFromEvent={(e: any) => (Array.isArray(e.fileList) ? e.fileList : [])}
                >
                    <Upload beforeUpload={() => false} multiple listType="picture">
                        <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                    </Upload>
                </Form.Item>
                <div style={{ marginBottom: 16 }}>
                    <h3>Отзывы</h3>
                    {reviews.map((review, index) => (
                        <div key={index} style={{ marginBottom: 16 }}>
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
                            <Form.Item
                                label="Фото отзыва"
                                valuePropName="fileList"
                                getValueFromEvent={(e: any) =>
                                    Array.isArray(e.fileList) ? e.fileList : []
                                }
                            >
                                <Upload
                                    beforeUpload={() => false}
                                    multiple
                                    listType="picture"
                                    onChange={({ fileList }) => {
                                        const updatedReviews = [...reviews];
                                        updatedReviews[index].photos = fileList;
                                        setReviews(updatedReviews);
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                                </Upload>
                            </Form.Item>
                            <Button danger onClick={() => onRemoveReview(index)}>
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
                        Добавить проект
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const ServicesManagement: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('price', values.price);

            if (values.image && values.image.length > 0) {
                formData.append('image', values.image[0].originFileObj);
            }

            formData.append('is_active', values.isActive ? 'true' : 'false');

            await axios.post('/prod/services', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            notification.success({ message: 'Услуга успешно добавлена' });
            form.resetFields();
        } catch (error) {
            notification.error({ message: 'Ошибка при добавлении услуги' });
        }
    };

    return (
        <div>
            <h2>Управление услугами</h2>
            <Form form={form} name="services" layout="vertical" onFinish={onFinish}>
                <Form.Item name="name" label="Название услуги" rules={[{ required: true }]}>
                    <Input placeholder="Введите название услуги" />
                </Form.Item>
                <Form.Item name="description" label="Описание">
                    <Input.TextArea rows={4} placeholder="Введите описание услуги" />
                </Form.Item>
                <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
                    <InputNumber min={0} placeholder="Введите цену" />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Фото"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => (Array.isArray(e.fileList) ? e.fileList : [])}
                >
                    <Upload beforeUpload={() => false} listType="picture">
                        <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="isActive" valuePropName="checked">
                    <Checkbox>Активно</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Добавить услугу
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminPage;
