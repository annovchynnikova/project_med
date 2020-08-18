import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import Search from './Search';


function MedicineList ({ auth: {user} }){
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

    const updateSearchTerms = (newSearchTerm) => {
        axios.post('/medicines/find', newSearchTerm)
        .then(res => {
            setMedicines(res.data);
        })
        .catch(err => {
            console.log(err);
        });
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
        return(
            <div>
            <Search refreshFunction={updateSearchTerms}/>
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
        );
}

MedicineList.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(MedicineList);