import { useEffect, useState } from "react";
import axios from "axios";

/*
    This is the home page for our web app, in this component , we have useEffect that will fetch the rss feed from the https://rajesagarwal.com and show all the rss feed on home page .
*/



const Dashboard = () => {
  const [feedItems, setFeedItems] = useState([]);

  // this useEffect will fetch the rss from the server
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/rss-feed`);

        if (!response) {
          console.log("Items are not present");
        }

        setFeedItems(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeed();
  }, []);

  return (
    <section className="dashboard-container">
      <div className="rss-container">
        {feedItems.map((item) => (
          <div key={item.guid} className="feed-item">
            <h3 className="feed-item-title">
              <a href={item.link} target="_blank" rel="noreferrer noopener">
                {item.title}
              </a>
            </h3>
            <p
              className="feed-item-description"
              dangerouslySetInnerHTML={{
                __html: item["content:encodedSnippet"],
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
