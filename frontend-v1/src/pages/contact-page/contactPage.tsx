import React from 'react';
import { COMPANY_NAME, COMPANY_PHONE, COMPANY_PHONE_2, COMPANY_EMAIL } from 'constants/constants';
import './ContactPage.scss';

export const ContactPage = () => {
    return (
        <div className="contact-page">
            <h1 className="contact-page__title">Контакты {COMPANY_NAME}</h1>
            <div className="contact-page__info-block">
                <h2>Телефон:</h2>
                <p>{COMPANY_PHONE}; {COMPANY_PHONE_2}</p>
                
                <h2>Адрес:</h2>
                <p>Счастливая улица, 7, ТСН Парк Комфорт, Дальнеконстантиновский муниципальный округ, Нижегородская область</p>
                
                <h2>E-mail:</h2>
                <p><a href="mailto:info@s-dom21.ru">{COMPANY_EMAIL}</a></p>
            </div>

            <div className="contact-page__legal-info">
                <h1>Юридическая информация</h1>
                <div className="legal-info__grid">
                    <div className="legal-info__item">
                        <div className="legal-info__label">Наименование предприятия:</div>
                        <div className="legal-info__value">Индивидуальный предприниматель Беляева Мария Лазаревна</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Юридический адрес:</div>
                        <div className="legal-info__value">428024 Чувашская Республика, город Чебоксары, улица Хевешская дом 15, корпус 1, квартира 18</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Физический адрес:</div>
                        <div className="legal-info__value">607635 г. Нижний Новгород, сп. Новинки, Уютный пер., д. 32</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">ИНН:</div>
                        <div className="legal-info__value">212801375536</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">ОКПО:</div>
                        <div className="legal-info__value">0136047678</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Расчетный счет:</div>
                        <div className="legal-info__value">40802810829040001931</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Название банка:</div>
                        <div className="legal-info__value">ФИЛИАЛ "НИЖЕГОРОДСКИЙ" АО "АЛЬФА-БАНК"</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Корреспондентский счет:</div>
                        <div className="legal-info__value">30101810200000000824</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">БИК:</div>
                        <div className="legal-info__value">042202824</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">ОГРНИП:</div>
                        <div className="legal-info__value">318213000054541</div>
                    </div>
                </div>
            </div>
            <div className="contact-page__legal-info">
                <h1>Юридическая информация</h1>
                <div className="legal-info__grid">
                    <div className="legal-info__item">
                        <div className="legal-info__label">Наименование предприятия:</div>
                        <div className="legal-info__value">Индивидуальный предприниматель Беляев Сергей Геннадьевич</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Юридический адрес:</div>
                        <div className="legal-info__value">428024 Чувашская Республика, город Чебоксары, улица Хевешская дом 15, корпус 1, квартира 18</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Физический адрес:</div>
                        <div className="legal-info__value">607635 г. Нижний Новгород, сп. Новинки, Уютный пер., д. 32</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">ИНН:</div>
                        <div className="legal-info__value">212807881923</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">КПП:</div>
                        <div className="legal-info__value">526101001</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Расчетный счет:</div>
                        <div className="legal-info__value">40802810129040013535</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Название банка:</div>
                        <div className="legal-info__value">ФИЛИАЛ "НИЖЕГОРОДСКИЙ" АО "АЛЬФА-БАНК"</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Корреспондентский счет:</div>
                        <div className="legal-info__value">30101810200000000824</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">БИК:</div>
                        <div className="legal-info__value">042202824</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">ОГРН:</div>
                        <div className="legal-info__value">1245200012860</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
