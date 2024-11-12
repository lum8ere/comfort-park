import React from 'react';
import { Button, Result } from 'antd';

export const NotFoundPage: React.FC = () => {
    return (
        <Result
        status="404"
        title="404"
        subTitle="К сожалению, страница, которую вы посетили, не существует."
        extra={<Button type="primary">Назад</Button>}
      />
    );
}