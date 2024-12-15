// src/pages/admin/ServicesManagement.tsx

import React, { useEffect, useState } from 'react';
import {
    Table,
    Form,
    Input,
    Button,
    InputNumber,
    Checkbox,
    Upload,
    notification,
    Modal
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks';
import { selectServices } from 'store/slices/services/serviceSelectors';
import axios from '../../service/axiosConfig';
import { fetchServices } from 'store/slices/services/servicesSlice';

const ServicesManagement: React.FC = () => {
    const dispatch = useAppDispatch();
    const services = useSelector(selectServices);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const columns = [
        { title: 'Название услуги', dataIndex: 'name', key: 'name' },
        { title: 'Описание', dataIndex: 'description', key: 'description' },
        { title: 'Цена', dataIndex: 'price', key: 'price' },
        {
            title: 'Активно',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (val: boolean) => (val ? 'Да' : 'Нет')
        }
    ];

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
            setIsModalVisible(false);
        } catch (error) {
            notification.error({ message: 'Ошибка при добавлении услуги' });
        }
    };

    return (
        <div>
            <h2>Управление услугами</h2>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>Добавить услугу</Button>
            <Table columns={columns} dataSource={services} rowKey="id" style={{ marginTop: 16 }} />

            <Modal
                title="Добавить услугу"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} name="services" layout="vertical" onFinish={onFinish}>
                    <Form.Item name="name" label="Название услуги" rules={[{ required: true }]}>
                        <Input placeholder="Введите название услуги" />
                    </Form.Item>
                    <Form.Item name="description" label="Описание">
                        <Input.TextArea rows={4} placeholder="Введите описание услуги" />
                    </Form.Item>
                    <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
                        <InputNumber min={0} placeholder="Введите цену" style={{ width: '100%' }} />
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

export default ServicesManagement;
