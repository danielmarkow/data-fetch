function Form({doFetch, query, setQuery}) {

    function onSubmit(event) {
        doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <button
                type="submit"
            >Search</button>
        </form>
    );
}

export default Form;