import React from 'react'

import NewsBar from './NewsBar';
import SelfMedicine from './SelfMedicine';

const Contacts = () => {
    return (
        <div className="mydiv">
            <NewsBar/>
            <div class="main_contacts">
                <h1 class="head-contacts">Контакти</h1>
                <p class="question-contacts">Маєте питання або побажання?</p>
                <p class="question-contacts">Зв'яжіться з нами!</p>
                <p class="phone-contacts">+380632360567</p>
                <p class="email-contacts">annaovchinnikova1403@gmail.com</p>
            </div>
            <SelfMedicine/>
        </div>
    )
}

export default Contacts;