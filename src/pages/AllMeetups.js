import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const AllMeetupsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://hooks-test-c43cd-default-rtdb.firebaseio.com/meetups.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetupsData = [];
        console.log(data);
        for(const key in data) {
          const meetupData = {
            id: key,
            title: data[key].title,
            image: data[key].image,
            address: data[key].address,
            description: data[key].description
          };
          meetupsData.push(meetupData);
        }
        setIsLoading(false);
        setLoadedMeetups(meetupsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    }, []);
    
  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <ul>
        <MeetupList meetups={loadedMeetups} />
      </ul>
    </section>
  );
};

export default AllMeetupsPage;
