import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import CheckBox from './CheckBox';

import NewsBar from './NewsBar';
import SelfMedicine from './SelfMedicine';

function MedicinesByAlphabet ({ auth: {user} }){
    const [Medicines, setMedicines] = useState([]);
    useEffect(() => {
            getMedicines();
    }, []);

    const getMedicines = () => {
        axios.get('/medicines/')
        .then(res => {
            setMedicines(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const LikeHandler = (id) => () => {
        axios.post('/medicines/like/' + user._id + '/' + id)
        .then(res => {
            console.log('medicine added')
        })
        .catch(err => {
            console.log(err);
        });
    }

    const renderMedicine = Medicines.map((medicine, i) => {
        return <tr key={i}>
          <td>{medicine.name}</td>
          <td>{medicine.symptom}</td>
          <td>{medicine.form}</td>
          { user && 
            <td>
            <i style={{paddingLeft: '40px'}}
                className="fa fa-heart-o"
                aria-hidden="true"
                style={{cursor:'pointer'}}
                onClick={LikeHandler(medicine._id)}
                ></i>
            </td>
            }
        </tr>
    });

    const handleFilters = (filters) => {
        axios.post('/medicines/filter', filters)
        .then(res => {
            setMedicines(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    return(
        <div className="mydiv">
            <NewsBar/>
            <div className="tableClass">
                <CheckBox
                    handleFilters={filters => handleFilters(filters)}
                />
                {Medicines.length === 0 ?
                        (<h2>Server connection...</h2>)
                    :
                    (<div>
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>Назва</th>
                                    <th>Симптоми</th>
                                    <th>Форма</th>
                                    { user && 
                                        <th>Подобається</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {renderMedicine}
                        </tbody>
                        </table>
                    </div>
                    )
                }
            </div>
            <SelfMedicine/>
        </div>
    );
}

MedicinesByAlphabet.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(MedicinesByAlphabet);