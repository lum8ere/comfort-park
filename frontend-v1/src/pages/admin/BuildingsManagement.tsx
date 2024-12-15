import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import { selectBuildings } from 'store/slices/buildings/buildingSelectors';
import axios from '../../service/axiosConfig';

const BuildingsManagement: React.FC = () => {
    const buildings = useSelector(selectBuildings);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        { title: 'Название здания', dataIndex: 'name', key: 'name' },
        { title: 'Размер', dataIndex: 'size', key: 'size' },
        { title: 'Этажность', dataIndex: 'floors', key: 'floors' },
        { title: 'Площадь', dataIndex: 'area', key: 'area' },
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
            setIsModalVisible(false);
        } catch (error) {
            notification.error({ message: 'Ошибка при добавлении здания' });
        }
    };

    return (
        <div>
            <h2>Управление зданиями</h2>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Добавить здание
            </Button>
            <Table
                columns={columns}
                dataSource={buildings}
                rowKey="id"
                style={{ marginTop: 16 }}
            />

            <Modal
                title="Добавить здание"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} name="buildings" layout="vertical" onFinish={onFinish}>
                    <Form.Item name="name" label="Название здания" rules={[{ required: true }]}>
                        <Input placeholder="Введите название здания" />
                    </Form.Item>
                    <Form.Item name="size" label="Размер">
                        <Input placeholder="Введите размер здания. Пример: 10x5" />
                    </Form.Item>
                    <Form.Item name="floors" label="Этажность" rules={[{ required: true }]}>
                        <InputNumber min={1} placeholder="Введите количество этажей" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="area" label="Площадь" rules={[{ required: true }]}>
                        <InputNumber min={0} placeholder="Введите площадь здания" style={{ width: '100%' }} />
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
                        <InputNumber min={0} placeholder="Введите цену" style={{ width: '100%' }} />
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
