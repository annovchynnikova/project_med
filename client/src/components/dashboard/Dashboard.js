import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';

import NewsBar from '../layout/NewsBar';
import SelfMedicine from '../layout/SelfMedicine';
import MedicineRow from './MedicineRow';

function Dashboard ({ auth: {user} }){

    const [Medicines, setMedicines] = useState([]);
    const [ToTake, setToTake] = useState([]);

    useEffect(() => {
        if(user){
            getMedicines();
            getToTake();
        }
    }, [user]);

    const getMedicines = () => {
        axios.get(`/medicines/like/${ user._id }`)
        .then(res => {
            setMedicines([...Medicines, ...res.data]);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getToTake= () => {
        axios.get(`/medicines/take/${ user._id }`)
        .then(res => {
            setToTake([...ToTake, ...res.data]);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleTakeMedicine = async ({ id, date, daysCount }) => {
      await axios.post(`medicines/take/${user._id}/${id}`, {
        date, daysCount
      });
    };

    const medicinesTable = Medicines
      .filter(m => !!m)
      .map((m) => <MedicineRow {...m} onTake={handleTakeMedicine} />);

    const toTakeTable = ToTake.filter(t => !!t).map(({ begin, days, medicineId }, i) => {
      const medicine = Medicines.filter(m => !!m).find(({ _id }) => {
        console.log('???', _id, medicineId);
        return _id === medicineId;
      });

      return medicine && (
        <>
          <tr key={i}>
            <td>{medicine.name}</td>
            <td>{new Date(begin).toLocaleDateString()}</td>
            <td>{new Date(new Date(begin).getTime() + 1000 * 60 * 60 * 24 * days).toLocaleDateString()}</td>
          </tr>
        </>
      )
    });

    return (
        <div className="mydiv">
            <NewsBar/>
            <div>
                <h1 style={{marginTop: '30px'}}>Не хворій, { user && user.username }</h1>
                <h2>Вподобання:</h2>
                    {Medicines.length === 0 ?
                        (<h2>No medicines yet...</h2>)
                    :
                    (<div>
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>Назва</th>
                                    <th>Симптоми</th>
                                    <th>Форма</th>
                                    <th>Лікування</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicinesTable}
                        </tbody>
                        </table>
                    </div>
                    )
                }

                <h2>Лікування:</h2>

                {ToTake.length === 0 ?
                        (<h2>No medicines yet...</h2>)
                    :
                    (<div>
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    {/* <th>Симптоми</th>
                                    <th>Форма</th> */}
                                    <th>Початок</th>
                                    <th>Кiнець</th>
                                </tr>
                            </thead>
                            <tbody>
                                {toTakeTable}
                        </tbody>
                        </table>
                    </div>
                    )
                }

            </div>
            <SelfMedicine/>
        </div>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
