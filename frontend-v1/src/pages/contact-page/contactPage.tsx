import React from 'react';
import './ContactPage.scss';

export const ContactPage = () => {
    return (
        <div className="contact-page">
            <h1 className="contact-page__title">Контакты "Лесная сказка"</h1>
            <div className="contact-page__info-block">
                <h2>Телефон:</h2>
                <p>+7 (835) 223-84-15</p>
                
                <h2>Адрес:</h2>
                <p>Чувашская Республика, г. Чебоксары, Ярославская ул, 72</p>
                
                <h2>E-mail:</h2>
                <p><a href="mailto:info@s-dom21.ru">info@s-dom21.ru</a></p>
            </div>

            <div className="contact-page__legal-info">
                <h1>Юридическая информация</h1>
                <div className="legal-info__grid">
                    <div className="legal-info__item">
                        <div className="legal-info__label">Сокращенное наименование:</div>
                        <div className="legal-info__value">ООО «Лесная сказка»</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Юридический адрес:</div>
                        <div className="legal-info__value">428003, Чувашская Республика - Чувашия, Чебоксары, Ярмарочная ул, дом 9, корпус II, помещение 9</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Физический адрес:</div>
                        <div className="legal-info__value">428003, Чувашская Республика - Чувашия, Чебоксары, Ярославская, 72</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">ИНН:</div>
                        <div className="legal-info__value">2130203823</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">КПП:</div>
                        <div className="legal-info__value">213001001</div>
                    </div>

                    <div className="legal-info__item">
                        <div className="legal-info__label">Расчетный счет:</div>
                        <div className="legal-info__value">40701810202940000040</div>
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
                        <div className="legal-info__value">1182130009082</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
