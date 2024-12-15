import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchUser } from 'store/slices/auth/authSlice';
import { RootState, AppDispatch } from 'store';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.auth);

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        await dispatch(login({ email: values.email, password: values.password }));
    };

    useEffect(() => {
        if (auth.token && !auth.user && !auth.loading) {
            // Если есть токен, но пользователь еще не загружен, загрузим его
            dispatch(fetchUser());
        } else if (auth.token && auth.user) {
            navigate('/admin'); // Перенаправление на админку после успешного логина
        }
    }, [auth.token, auth.user, auth.loading, navigate, dispatch]);

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, border: '1px solid #f0f0f0', borderRadius: 8 }}>
            <Title level={2} style={{ textAlign: 'center' }}>Вход</Title>
            {auth.error && <Alert message={auth.error} type="error" showIcon style={{ marginBottom: 16 }} />}
            <Form
                form={form}
                name="login"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите ваш Email!' },
                        { type: 'email', message: 'Введите корректный Email!' }
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
                >
                    <Input.Password placeholder="Пароль" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={auth.loading} block>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
