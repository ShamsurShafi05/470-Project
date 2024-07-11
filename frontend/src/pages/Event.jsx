import formatDate from "../utils/FormatDate";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Event = () => {
    const [events, setEvents] = useState(null);
    const [thisMonthEvents, setThisMonthEvents] = useState([]);
    const [futureEvents, setFutureEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/events/");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const json = await response.json();
                if (!json) {
                    throw new Error("Empty response or invalid JSON");
                }
                setEvents(json); // Assuming json is an array or object containing events data
            } catch (error) {
                console.error("Error fetching events:", error);
                // Handle specific errors or log them as needed
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        if (events) {
            const currentDate = new Date();
            const thisMonth = currentDate.getMonth();
            const thisYear = currentDate.getFullYear();

            const thisMonthEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getMonth() === thisMonth && eventDate.getFullYear() === thisYear;
            });

            const futureEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate > currentDate && (eventDate.getMonth() !== thisMonth || eventDate.getFullYear() !== thisYear);
            });

            // Sort
            thisMonthEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
            futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

            // Update
            setThisMonthEvents(thisMonthEvents);
            setFutureEvents(futureEvents);
        }
    }, [events]);

    console.log(`Ekhane asi`);
    console.log(`All events:`, events);
    console.log(`Kaj ki korse?:`, thisMonthEvents, futureEvents);

    return (
        <div className="event-page">
            <div className='Upperpart'>
                <h1><strong>DON'T MISS OUT</strong></h1>
                <h4>Discover events around your campus</h4>
            </div>
            <>
                <h2><span className="special-letter">THIS MONTH</span></h2>
                <div className="Info">
                    <div className="InfoContent">
                        {thisMonthEvents && thisMonthEvents.length > 0 ? (
                            thisMonthEvents.map((event, index) => (
                                <div className="EachInfo" key={index}>
                                    <div className="ImagePart"></div>
                                    <div className="ContentPart">
                                        <h3><strong>{event.title}</strong></h3>
                                        <div className="ContentPartSplit">
                                            <p><b><span className="special-letter">Date:</span> {formatDate(event.date)}</b></p>
                                            <Link to={`/events/${event._id}`}></Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="NothingToShow">
                                No events to show
                            </div>
                        )}
                    </div>
                </div>

                <h2><span className="special-letter">UPCOMING EVENTS</span></h2>
                <div className="Info">
                    <div className="InfoContent">
                        {futureEvents && futureEvents.length > 0 ? (
                            futureEvents.map((event, index) => (
                                <div className="EachInfo" key={index}>
                                    <div className="ImagePart"></div>
                                    <div className="ContentPart">
                                        <h3><strong>{event.title}</strong></h3>
                                        <div className="ContentPartSplit">
                                            <p><b><span className="special-letter">Date:</span> {formatDate(event.date)}</b></p>
                                            <Link to={`/events/${event._id}`}></Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="NothingToShow">
                                No events to show
                            </div>
                        )}
                    </div>
                </div>
            </>
        </div>
    );
};

export default Event;
