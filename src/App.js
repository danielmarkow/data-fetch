import {useState} from "react";

import Container from "react-bootstrap/Container";

import useDataApi from "./customHooks/useDataApi";
import Form from "./components/Form";

function App() {

    const [query, setQuery] = useState("MIT");
    const [{data, isLoading, isError}, doFetch] = useDataApi(
        "https://hn.algolia.com/api/v1/search?query=MIT",
        {
            hits: []
        }
    );

    return (
        <Container>
            <Form setQuery={setQuery} query={query} doFetch={doFetch} />

            {isError && <div>something went wrong</div>}
            {isLoading ?
                (<div>Loading...</div>) : (
                    <ul>
                        {data.hits.map(item => (
                            <li key={item.objectID}>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                )}
        </Container>
      );
}

export default App;
