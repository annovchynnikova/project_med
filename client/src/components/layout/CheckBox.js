import React, {useState} from 'react';

const alphabet = [
    {
        "id": 1,
        "name": "А"
    },
    {
        "id": 2,
        "name": "Б"
    },
    {
        "id": 3,
        "name": "В"
    },
    {
        "id": 4,
        "name": "Г"
    },
    {
        "id": 5,
        "name": "Д"
    },
    {
        "id": 6,
        "name": "Е"
    },
    {
        "id": 7,
        "name": "Є"
    },
    {
        "id": 8,
        "name": "Ж"
    },
    {
        "id": 9,
        "name": "З"
    },
    {
        "id": 10,
        "name": "И"
    },
    {
        "id": 11,
        "name": "І"
    },
    {
        "id": 12,
        "name": "Ї"
    },
    {
        "id": 13,
        "name": "Й"
    },
    {
        "id": 14,
        "name": "К"
    },
    {
        "id": 15,
        "name": "Л"
    },
    {
        "id": 16,
        "name": "М"
    },
    {
        "id": 17,
        "name": "Н"
    },
    ,
    {
        "id": 18,
        "name": "О"
    },
    {
        "id": 19,
        "name": "П"
    },
    {
        "id": 20,
        "name": "Р"
    },
    {
        "id": 21,
        "name": "С"
    },
    {
        "id": 22,
        "name": "Т"
    },
    {
        "id": 23,
        "name": "У"
    },
    {
        "id": 24,
        "name": "Ф"
    },
    {
        "id": 25,
        "name": "Х"
    },
    {
        "id": 26,
        "name": "Ц"
    },
    {
        "id": 27,
        "name": "Ч"
    },
    {
        "id": 28,
        "name": "Щ"
    },
    {
        "id": 29,
        "name": "Щ"
    },
    {
        "id": 30,
        "name": "Ю"
    },
    {
        "id": 31,
        "name": "Я"
    }
];

const CheckBox = (props) => {
    const [Checked, setChecked] = useState();

    const onChange = (value) => {
        let newChecked = value.name;
        if(Checked === newChecked){
            newChecked = null;
        }
        setChecked(newChecked);
        props.handleFilters(newChecked);
    }

    const renderCheckboxList = () => alphabet.map((value, index) => (
        <span key={index} style={{display: 'inline-block', margin: 5}}>
            <input
                type="radio"
                onChange={() => onChange(value)}
                checked={Checked === value.name}
            />
            <p>{value.name}</p>
        </span>
    ));

    return (
        <div> { renderCheckboxList() } </div>
    )
}

export default CheckBox;