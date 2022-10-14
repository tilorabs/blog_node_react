function Search({handleSearch, search}) {
    return (
        <div className="search" >
            <input type="text" value={search} placeholder="Search" onChange={({target}) => handleSearch(target.value)}/>
        </div>
    );
}

export default Search;