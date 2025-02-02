// src/pages/admin/ProjectsManagement.tsx
// НЕ ИСПОЛЬЗУЕТСЯ

import React, { useState } from 'react';
import { Table, Form, Input, Button, Upload, notification, Modal, Popconfirm } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useProjectsData } from 'store/hooks';
import axios from '../../service/axiosConfig';

const ProjectsManagement: React.FC = () => {
    const { projects, refetch } = useProjectsData() 
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reviews, setReviews] = useState<
        { first_name: string; last_name: string; comment: string; photos: any[] }[]
    >([]);
    const [editingProject, setEditingProject] = useState<any>(null);

    const columns = [
        {
            title: 'Название проекта',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name.localeCompare(b.name)
        },
        { title: 'Описание', dataIndex: 'description', key: 'description' },
        {
            title: 'Отзывы',
            dataIndex: 'ProjectPhoto',
            key: 'ProjectPhoto',
            render: (reviews: any[]) => reviews?.length || 0
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button onClick={() => openEditModal(record)}>Редактировать</Button>
                    <Popconfirm
                        title="Удалить запись?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button danger>Удалить</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    const openEditModal = (project: any) => {
        setEditingProject(project);
        form.setFieldsValue({
            name: project.name,
            description: project.description
        });
        // Отзывы загрузим, если хотите редактировать и отзывы.
        // Если нет логики обновления отзывов при редактировании - можно оставить пустым.
        // TODO: доделать
        setReviews([]);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        setEditingProject(null);
        form.resetFields();
        setReviews([]);
        setIsModalVisible(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/prod/projects/${id}`);
            notification.success({ message: 'Проект успешно удален' });
            refetch();
        } catch (error) {
            notification.error({ message: 'Ошибка при удалении проекта' });
        }
    };

    const onAddReview = () => {
        setReviews([...reviews, { first_name: '', last_name: '', comment: '', photos: [] }]);
    };

    const onRemoveReview = (index: number) => {
        const updatedReviews = [...reviews];
        updatedReviews.splice(index, 1);
        setReviews(updatedReviews);
    };

    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description || '');

            // Фотографии проекта
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

            if (editingProject) {
                // Редактирование
                await axios.put(`/prod/projects/${editingProject.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                notification.success({ message: 'Проект успешно обновлен' });
            } else {
                // Добавление
                await axios.post('/prod/projects', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                notification.success({ message: 'Проект успешно добавлен' });
            }

            form.resetFields();
            setReviews([]);
            setIsModalVisible(false);
            refetch();
        } catch (error) {
            notification.error({ message: 'Ошибка при сохранении проекта' });
        }
    };

    return (
        <div>
            <h2>Управление проектами</h2>
            <Button type="primary" onClick={openAddModal}>
                Добавить проект
            </Button>
            <Table
                columns={columns}
                dataSource={projects}
                rowKey="id"
                style={{ marginTop: 16 }}
                size="small"
                scroll={{ x: true }}
            />

            <Modal
                title={editingProject ? 'Редактировать проект' : 'Добавить проект'}
                open={isModalVisible}
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
                            <div
                                key={index}
                                style={{
                                    marginBottom: 16,
                                    border: '1px solid #f0f0f0',
                                    padding: '8px'
                                }}
                            >
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
                                    <span style={{ display: 'block', marginBottom: 4 }}>
                                        Фото отзыва:
                                    </span>
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
                                <Button
                                    danger
                                    onClick={() => onRemoveReview(index)}
                                    style={{ marginTop: 8 }}
                                >
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
