import React from 'react';
import './AboutPage.scss';

export const AboutPage: React.FC = () => {
    return (
        <div className="homePageRoot">
            {/* Hero Section */}
            <section className="heroSection">О нас</section>

            {/* О нашей компании Section */}
            <section className="aboutSection">
                <h2 className="aboutSection-title">О нашей компании</h2>
                <div className="aboutSection-content">
                    <h3 className="aboutSection-heading">Строительная компания "Парк-комфорт"</h3>
                    <div className="aboutSection-inner">
                        <div className="aboutSection-imageWrap">
                            <img
                                src="src/assets/svidetel-iz-fryazino.jpg"
                                alt="Свидетель из Фрязино"
                            />
                            <div className="aboutSection-imageWrap-caption">
                                Свидетель из Фрязино
                                <br />
                                Генеральный директор
                            </div>
                        </div>
                        <div className="aboutSection-text">
                            <p>
                                Строительная компания “Парк-комфорт” – ......
                                {/* Добавьте описание вашей компании */}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Наши ценности Section */}
            <section className="valuesSection">
                <h2 className="valuesSection-title">Наши ценности</h2>
                {/* Добавьте описание ценностей компании */}
            </section>

            {/* Наша команда Section */}
            <section className="teamSection">
                <h2 className="teamSection-title">Наша команда</h2>
                <div className="teamSection-wrap">
                    {/* Team member 1 */}
                    <div className="teamSection-member">
                        <img src="src/assets/svidetel-iz-fryazino.jpg" alt="Свидетель из Фрязино" />
                        <div className="teamSection-member-caption">
                            Свидетель из Фрязино
                            <br />
                            Генеральный директор
                        </div>
                    </div>

                    {/* Team member 2 */}
                    <div className="teamSection-member">
                        <img src="src/assets/shkolnik-v-bolote.jpg" alt="Школьник в болоте" />
                        <div className="teamSection-member-caption">
                            Школьник в болоте
                            <br />
                            Менеджер по ... (указать должность)
                        </div>
                    </div>

                    {/* Team member 3 */}
                    <div className="teamSection-member">
                        <img src="src/assets/vazhniy-shi-fu.jpg" alt="Важный Ши Фу" />
                        <div className="teamSection-member-caption">
                            Важный Ши Фу
                            <br />
                            Бригадир
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
