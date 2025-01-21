import { memo, useState } from 'react';
import { Modal, Button } from 'antd';
import './ServiceCard.scss';

interface ServiceCardProps {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    imageURL?: string;
    isActive?: boolean;
    phone?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = memo(({ 
    name, 
    imageURL, 
    description, 
    price,
    isActive = true,
    phone = '+7 (987) 673-51-55'
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        if(isActive) setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="service-card-page" style={{ backgroundImage: `url(${imageURL})`}}>
                <div className="service-card-page_header">
                    <h2 className="service-card-page_title">{name}</h2>
                    {!isActive && (
                        <div className="service-status inactive">Временно недоступно</div>
                    )}
                </div>
                {isActive && (
                    <button 
                        className="service-card-page_button" 
                        onClick={showModal}
                    >
                        Подробнее
                    </button>
                )}
            </div>

            <Modal
                title={name}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                className="service-modal"
            >
                <div className="modal-content">
                    {price && (
                        <div className="price-section">
                            <span className="price-label">Стоимость:</span>
                            <span className="price-value">{price.toLocaleString()} ₽</span>
                        </div>
                    )}
                    
                    {description && (
                        <div className="description-section">
                            <h3>Описание услуги:</h3>
                            <p>{description}</p>
                        </div>
                    )}

                    <div className="contacts-section">
                        <Button 
                            type="primary" 
                            size="large"
                            href={`tel:${phone}`}
                            className="call-button"
                        >
                            Позвонить: {phone}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
});