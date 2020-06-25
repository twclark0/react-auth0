import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const Redirecting = () => <div>Loading...</div>;

const PrivateRoute = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`http://localhost:3001`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const res = await response.json();
        setPosts(res);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  return (
    <ul>
      {posts.map(({ description }, index) => {
        return <li key={index}>{description}</li>;
      })}
    </ul>
  );
};

const Profile = withAuthenticationRequired(PrivateRoute, Redirecting);

export default Profile;
