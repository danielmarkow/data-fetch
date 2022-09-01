import {useState, useEffect} from "react";

import axios from "axios";
import Container from "react-bootstrap/Container";

import Form from "./components/Form";

function App() {

    const [data, setData] = useState({ hits: []});
    const [url, setUrl] = useState("https://hn.algolia.com/api/v1/search?query=MIT");
    const [query, setQuery] = useState("MIT");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const result = await axios(url);
                setData(result.data);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }

        fetchData();
    }, [url])

    return (
        <Container>
            <Form setQuery={setQuery} query={query} setUrl={setUrl} />

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
