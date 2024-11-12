import React, { PropsWithChildren, memo } from 'react';
import { Skeleton } from 'antd'

interface SkeletonProps extends PropsWithChildren {
    status?: boolean;
}

export const SkeletonLoader = memo(({ children, status = true }: SkeletonProps) => {
    return (
        <Skeleton>
            {children}
        </Skeleton>
    );
});