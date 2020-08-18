import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import useModalState from '../../hooks/useModalState';
import Modal from '../layout/Modal';

import "react-datepicker/dist/react-datepicker.css";

const MedicineRow = ({
  _id, name, symptom, form, onTake
}) => {
  const takeModal = useModalState(false);
  const [date, setDate] = useState(Date.now());
  const [daysCount, setDaysCount] = useState(1);

  const handleDaysCountChange = ({ target: { value } }) => {
    setDaysCount(value);
  }

  const handleTake = () => {
    onTake({ id: _id, date, daysCount });
    takeModal.close();
  }

  return (
    <tr>
      <td>{name}</td>
      <td>{symptom}</td>
      <td>{form}</td>
      <td>
        <input
          type="submit"
          onClick={takeModal.open}
          className="btn btn-primary"
          value="Почати приймати"
        />
      </td>
      <Modal
        state={takeModal}
      >
        {/* @TODO: Styles */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          Choose the date:
          <DatePicker
            selected={date}
            onChange={setDate}
          />
          Days count
          <input
            type="number"
            onChange={handleDaysCountChange}
            value={daysCount}
          />

          <button onClick={handleTake}>Take</button>
        </div>
      </Modal>
    </tr>
  )
};

export default MedicineRow;
