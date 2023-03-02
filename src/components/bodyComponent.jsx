import React, { useState, useEffect } from "react";
import "./bodyComponent.css"
const API_KEY = "gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7";
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&thumbs=true`;

function BodyComponent() {
    const [latestResult, setLatestResult] = useState(null);
    const [previousResults, setPreviousResults] = useState([]);
    const [olderResults, setOlderResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLatestResult();
        fetchPreviousResults();
        fetchOlderResults();
    }, []);

    async function fetchLatestResult() {
        const response = await fetch(API_URL);
        const result = await response.json();
        setLatestResult(result);
        setLoading(false);
    }

    async function fetchPreviousResults() {
        const response = await fetch(
            `${API_URL}&start_date=2022-02-01&end_date=2022-02-07`
        );
        const results = await response.json();
        setPreviousResults(results);
    }

    async function fetchOlderResults() {
        const response = await fetch(
            `${API_URL}&start_date=2022-01-01&end_date=2022-01-28`
        );
        const results = await response.json();
        setOlderResults(results);
    }


    function handleThumbnailClick(result) {
        setLatestResult(result)
        
        if(!previousResults.includes(result)){
            previousResults.pop()
        setPreviousResults([result,...previousResults])
        }
    }

    // let desc = latestResult.explanation.split(".")[0] + "," + latestResult.explanation.split(".")[1] + "," + latestResult.explanation.split(".")[2] + "," + latestResult.explanation.split(".")[3]

    return (
        <div className="App">
            <header className="App-header">
                <div className="spotlight-section">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="container">
                            <div className="content">
                                <p><b>Title </b>: {latestResult.title}</p>
                                <p><b>Description</b> : {latestResult.explanation.slice(250)}.</p>
                                <p><b>Author</b> : <i>{latestResult.copyright}</i></p>
                            </div>
                            <div className="media">
                                {latestResult.media_type === "image" ?
                                    <img className="spotImage" src={latestResult.url} alt="imageposter" /> :
                                    <iframe allowFullScreen className="spotImage" allow="autoplay" src={latestResult.url} ></iframe>
                                    // <video height="40vh" width="42vw" className="spotImage" controls>
                                    //     <source src={latestResult.url} type="video/mp4" alt="video" />
                                    // </video>
                                }
                            </div>
                        </div>

                    )}
                </div>
                <hr></hr>
                <div className="previous-results-section">
                    <h3>Previous Results</h3>
                    <div className="result-scroll">
                        {previousResults.map((result) => (
                            <div
                                className="result-card"
                                key={result.date}
                                onClick={() => handleThumbnailClick(result)}
                            >
                                {result.media_type === "image" ? <img className="imagecard" src={result.url} alt={result.title} />
                                    : <img className="imagecard" src={result.thumbnail_url} alt={result.title} />}
                                <h4>{result.title}</h4>
                                <p>Date: {result.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="older-results-section">
                    <h3>Older Results</h3>
                    <div className="result-scroll-down">
                        {olderResults.map((result) => (
                            <div
                                className="result-card"
                                key={result.date}
                                onClick={() => handleThumbnailClick(result)}
                            >
                                {result.media_type == "image" ? <img className="imagecard" src={result.url} alt={result.title} />
                                    : <img className="imagecard" src={result.thumbnail_url} alt={result.title} />}
                                <h4>{result.title}</h4>
                                <p>Date: {result.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
        </div>
    )
}


export default BodyComponent;