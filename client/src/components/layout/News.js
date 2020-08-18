import React from 'react'

import NewsBar from './NewsBar';
import SelfMedicine from './SelfMedicine';

const News = () => {
    return (
        <div className="mydiv">
            <NewsBar/>
            <div class="main_contacts">
                <h1 class="head-contacts">Новини</h1>
                <p class="question-contacts">Слідкуйте за найголовнішим</p>
                <p class="question-contacts">розом з нами!</p>
                <a href="">
                    <div class="n1">
                        <img src="https://tv7.ua/userfiles/novosti/92823132_540709166857451_2599333169819811840_n.png" alt=""/>
                        <h4>Нові довідки</h4>
                        <p>У гуртожитках потрібно принести довідки відповідного зразка</p>
                    </div>
                </a>
            </div>
            <SelfMedicine/>
        </div>
    )
}

export default News;