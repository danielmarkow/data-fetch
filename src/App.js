import {useState} from "react";

import Container from "react-bootstrap/Container";

import useDataApi from "./customHooks/useDataApi";
import Form from "./components/Form";
import Pagination from "./components/Pagination";

function App() {
    const pageSize = 10;
    const [query, setQuery] = useState("MIT");
    const [currentPage, setCurrentPage] = useState(1);
    const [{data, isLoading, isError}, doFetch] = useDataApi(
        "https://hn.algolia.com/api/v1/search?query=MIT",
        {
            hits: []
        }
    );

    function handlePageChange(event) {
        setCurrentPage(Number(event.target.textContent));
    };

    function paginate(items, pageNumber, pageSize) {
        const start = (pageNumber - 1) * pageSize;
        let page = items.slice(start, start + pageSize);
        return page;
    };

    let page = data.hits;
    if (page.length >= 1) {
        page = paginate(page, currentPage, pageSize);
    }

    return (
        <Container>
            <Form setQuery={setQuery} query={query} doFetch={doFetch} />

            {isError && <div>something went wrong</div>}
            {isLoading ?
                (<div>Loading...</div>) : (
                    <ul>
                        {page.map(item => (
                            <li key={item.objectID}>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                )}
            <Pagination
                items={data.hits}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </Container>
      );
}

export default App;
