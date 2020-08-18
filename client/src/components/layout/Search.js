import React, { useState } from 'react'

function Search(props) {
    const [SearchTerms, setSearchTerms] = useState("");
    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value);
        props.refreshFunction(event.currentTarget.value);
    }
    return (
        <div>
            <input
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder="Пошук за симптомом"
                className="search"
            />
        </div>
    )
}

export default Search;