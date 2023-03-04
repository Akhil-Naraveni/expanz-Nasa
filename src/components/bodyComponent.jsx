import React, { useState, useEffect } from "react";
import "./bodyComponent.css"
const API_KEY = "gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7";
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&thumbs=true`;

function BodyComponent() {
    const [latestResult, setLatestResult] = useState(null);
    const [previousResults, setPreviousResults] = useState([]);
    const [olderResults, setOlderResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dates, setDates] = useState(["2022-02-01", "2022-02-07"])
    const [popup, setPopup] = useState(false)
    const [flag, setFlag] = useState(true)
    useEffect(() => {

        fetchPreviousResults();
        fetchOlderResults();
    }, [dates]);
    if (flag) {
        async function fetchLatestResult() {
            const response = await fetch(API_URL);
            const result = await response.json();
            setLoading(false);
            setLatestResult(result)

        }
        fetchLatestResult();
        setFlag(false)

    }




    async function fetchPreviousResults() {
        console.log("triggered previous")
        const response = await fetch(
            `${API_URL}&start_date=${dates[0]}&end_date=${dates[1]}`
        );
        const results = await response.json();
        results.pop()
        setPreviousResults(results);

    }

    async function fetchOlderResults() {
        const response = await fetch(
            `${API_URL}&start_date=2022-02-01&end_date=2022-02-22`
        );
        const results = await response.json();
        setOlderResults(results);


    }


    function handleThumbnailClick(result) {
        console.log(result.date)
        var d = new Date(result.date);
        d.setDate(d.getDate() - 7);
        d.setMonth(d.getMonth() + 1 - 0);
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        let parsedDate;
        if (curr_month < 10 && curr_date < 10) {
            parsedDate = curr_year + "-" + "0" + curr_month + "-" + "0" + curr_date
        } else if (curr_month < 10 && curr_date > 9) {
            parsedDate = curr_year + "-" + "0" + curr_month + "-" + curr_date;
        } else if (curr_month > 9 && curr_date < 10) {
            parsedDate = curr_year + "-" + curr_month + "-" + "0" + curr_date;
        } else {
            parsedDate = curr_year + "-" + curr_month + "-" + curr_date
        }
        console.log(parsedDate)
        let lastSevthdate = parsedDate
        setDates([lastSevthdate, result.date])
        // fetchPreviousResults(dates)
        console.log(dates)
        setLatestResult(result)
        setLoading(false)
        setPopup(true)

    }
    const handlePopup = () => {
        setPopup(false)
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
                                    <iframe allowFullScreen className="spotImage" title={latestResult.title} allow="autoplay" src={latestResult.url} ></iframe>
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
                {popup ? <div className="popupcontainer">
                    <div style={{ zIndex: 1 }} className="popupCard">
                        <div className="textContent">
                           <b><p>Title</p></b>
                            <p>{latestResult.title}</p>
                            <b><span>Description</span></b>
                        <p>{latestResult.explanation.slice(0,300)} .</p> 
                        <div className="bottomPopup">
                            <div><b> <p>Date</p></b> 
                        <p>{latestResult.date}</p></div>
                       <div><b><p>Author</p></b>
                       <p>{latestResult.copyright}</p></div>
                        
                        </div>
                        </div>
                        <hr/>
                        <div className="imgContent">
                            {latestResult.media_type === "image" ?
                                <img className="spotImagePop" src={latestResult.url} alt="imageposter" /> :
                                <iframe allowFullScreen className="spotImagePop" title={latestResult.title} allow="autoplay" src={latestResult.url} ></iframe>

                            }

                        </div>
                        
                    </div>
                    <div><button className="popupbtn" onClick={handlePopup}><b>Okay</b></button></div>
                </div> : ""}
                <div className="older-results-section">
                    <h3>Older Results</h3>
                    <div className="result-scroll-down">
                        {olderResults.map((result) => (
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

            </header>

        </div>
    )
}


export default BodyComponent;