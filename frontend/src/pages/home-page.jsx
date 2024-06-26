import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PageLayout,
  Button,
  HeaderImage,
  NavBar,
  SocketComponent,
} from "../components/";
import { Link } from "react-router-dom";
import globalStyles from "../globals.module.scss";
import styles from "./home-page.module.scss";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [events, setEvents] = useState([]); // Initialize events state
  const [createdEvents, setCreatedEvents] = useState([]); // Initialize events state

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleCreateEventButton = () => {
    navigate(`/create-event`);
  };

  const handleJoinEventButton = () => {
    navigate(`/join-event`);
  };

  useEffect(() => {
    // Function to fetch events
    const fetchEvents = async () => {
      try {
        // Adjust the request URL as needed to match your backend endpoint
        const response = await axios.get(
          "http://localhost:3000/event/getEvents",
          {
            withCredentials: true, // Necessary for sessions to work across domains
          }
        );
        setEvents(response.data); // Set fetched events to state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Function to fetch events
    const fetchEvents = async () => {
      try {
        // Adjust the request URL as needed to match your backend endpoint
        const response = await axios.get(
          "http://localhost:3000/event/getCreatedEvents",
          {
            withCredentials: true, // Necessary for sessions to work across domains
          }
        );
        setCreatedEvents(response.data); // Set fetched events to state
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <PageLayout
      includeNav
      header={<HeaderImage />}
      buttons={
        <>
          <Button variant="primary" onClick={handleJoinEventButton}>
            Join Event
          </Button>
          <Button variant="secondary" onClick={handleCreateEventButton}>
            Create Event
          </Button>
        </>
      }
    >
      <div className={styles.homePage}>
        <h1>YOUR EVENTS</h1>
        <div className={styles.eventList}>
          {events.map((event) => (
            <Link
              to={`/event/${event._id}`}
              key={event._id}
              className={styles.eventItem}
            >
              {event.nameOfEvent}
            </Link>
          ))}
        </div>

        <div className={`${styles.eventList} ${styles.createdEventList}`}>
          <h2 className={globalStyles.subtitle}>Your Created Events</h2>

          {createdEvents.map((event) => (
            <Link
              to={`/event/${event._id}`}
              key={event._id}
              className={styles.eventItem}
            >
              {event.nameOfEvent}
            </Link>
          ))}
        </div>
      </div>
      <SocketComponent userId={userId} />
    </PageLayout>
  );
};
