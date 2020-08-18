import React from 'react';
import MedicineList from './MedicineList';

import NewsBar from './NewsBar';
import SelfMedicine from './SelfMedicine';

const Lending = () => {
    return (
        <div className="mydiv">
            <NewsBar/>
            {/* <div className="news">
            29.052020. УНН. Вартість костюмів - абсолютно виправдана, якщо розглядати їх на предмет стовідсоткової відповідності до критеріїв МОЗу згідно з стандартом 14126 "Одяг захисний. Захист від інфекційних агентів”.
            </div> */}
            <div className="tableClass">
                <MedicineList/>
            </div>
            <SelfMedicine/>
        </div>
    )
}

export default Lending;