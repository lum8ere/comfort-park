// BuildingsManagement.tsx (дополнение)

import React, { useState, useEffect } from 'react';
import {
    Table,
    Form,
    Input,
    Button,
    InputNumber,
    Checkbox,
    Upload,
    notification,
    Modal,
    Popconfirm
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'; // Предполагаем, что у нас есть такой экшен
import { fetchBuildings } from 'store/slices/buildings/buildingsSlice';
import { selectBuildings } from 'store/slices/buildings/buildingSelectors';
import { useAppDispatch } from 'store/hooks';
import axios from '../../service/axiosConfig';

const BuildingsManagement: React.FC = () => {
    const dispatch = useAppDispatch();
    const buildings = useSelector(selectBuildings);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBuilding, setEditingBuilding] = useState<any>(null); // объект текущего редактируемого здания

    useEffect(() => {
        dispatch(fetchBuildings());
    }, [dispatch]);

    const columns = [
        { title: 'Название', dataIndex: 'name', key: 'name' },
        { title: 'Размер', dataIndex: 'size', key: 'size' },
        { title: 'Этажность', dataIndex: 'floors', key: 'floors' },
        { title: 'Площадь', dataIndex: 'area', key: 'area' },
        { title: 'Цена', dataIndex: 'price', key: 'price' },
        {
            title: 'Активно',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (val: boolean) => (val ? 'Да' : 'Нет')
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

    const openEditModal = (building: any) => {
        setEditingBuilding(building);
        form.setFieldsValue({
            name: building.name,
            size: building.size,
            floors: building.floors,
            area: building.area,
            description: building.description,
            price: building.price,
            isActive: building.is_active
        });
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        setEditingBuilding(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/prod/buildings/${id}`);
            notification.success({ message: 'Запись успешно удалена' });
            dispatch(fetchBuildings());
        } catch (error) {
            notification.error({ message: 'Ошибка при удалении' });
        }
    };

    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('size', values.size || '');
            formData.append('floors', values.floors);
            formData.append('area', values.area);
            formData.append('description', values.description || '');
            formData.append('price', values.price);
            formData.append('is_active', values.isActive ? 'true' : 'false');

            if (values.photos && values.photos.length > 0) {
                values.photos.forEach((file: any) => {
                    formData.append('photos', file.originFileObj);
                });
            }

            if (editingBuilding) {
                // Редактирование
                await axios.put(`/prod/buildings/${editingBuilding.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                notification.success({ message: 'Здание успешно обновлено' });
            } else {
                // Добавление
                await axios.post('/prod/buildings', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                notification.success({ message: 'Здание успешно добавлено' });
            }

            form.resetFields();
            setIsModalVisible(false);
            dispatch(fetchBuildings());
        } catch (error) {
            notification.error({ message: 'Ошибка при сохранении здания' });
        }
    };

    return (
        <div>
            <h2>Управление зданиями</h2>
            <Button type="primary" onClick={openAddModal}>
                Добавить здание
            </Button>
            <Table
                columns={columns}
                dataSource={buildings}
                rowKey="id"
                style={{ marginTop: 16 }}
                size="small"
                scroll={{ x: true }}
            />

            <Modal
                title={editingBuilding ? 'Редактировать здание' : 'Добавить здание'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} name="buildings" layout="vertical" onFinish={onFinish}>
                    <Form.Item name="name" label="Название здания" rules={[{ required: true }]}>
                        <Input placeholder="Введите название здания" />
                    </Form.Item>
                    <Form.Item name="size" label="Размер">
                        <Input placeholder="Введите размер здания" />
                    </Form.Item>
                    <Form.Item name="floors" label="Этажность" rules={[{ required: true }]}>
                        <InputNumber
                            min={1}
                            style={{ width: '100%' }}
                            placeholder="Введите количество этажей"
                        />
                    </Form.Item>
                    <Form.Item name="area" label="Площадь" rules={[{ required: true }]}>
                        <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            placeholder="Введите площадь здания"
                        />
                    </Form.Item>
                    <Form.Item name="description" label="Описание">
                        <Input.TextArea rows={4} placeholder="Введите описание" />
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
                    <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: '100%' }} placeholder="Введите цену" />
                    </Form.Item>
                    <Form.Item name="isActive" valuePropName="checked">
                        <Checkbox>Активно</Checkbox>
                    </Form.Item>
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

export default BuildingsManagement;
