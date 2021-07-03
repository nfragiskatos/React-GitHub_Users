import axios from "axios";
import React, { useEffect, useState } from "react";
import mockFollowers from "./mockData.js/mockFollowers";
import mockRepos from "./mockData.js/mockRepos";
import mockUser from "./mockData.js/mockUser";

const rootUrl = "https://api.github.com";

const GitHubContext = React.createContext();

const GitHubProvider = ({ children }) => {
  const [gitHubUser, setGitHubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit");
        }
      })
      .catch((error) => console.log(error));
  };

  const toggleError = (show = false, msg = "") => setError({ show, msg });

  const searchGitHubUser = async (user) => {
    toggleError();
    setIsLoading(true);

    // set loading
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) => {
      setIsLoading(false);
      console.log(error);
    });

    if (response) {
      setGitHubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]).then((results) => {
        const [repos, followers] = results;
        const status = "fulfilled";
        if (repos.status === status) {
          setRepos(repos.value.data);
        }
        if (followers.status === status) {
          setFollowers(followers.value.data);
        }
      });
    } else {
      toggleError(true, "there is no user with that username.");
    }
    checkRequests();
    setIsLoading(false);
  };

  useEffect(checkRequests, []);

  return (
    <GitHubContext.Provider
      value={{
        gitHubUser,
        repos,
        followers,
        requests,
        error,
        searchGitHubUser,
        isLoading,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export { GitHubProvider, GitHubContext };
