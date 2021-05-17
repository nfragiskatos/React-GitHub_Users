import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

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

  useEffect(checkRequests, []);

  return (
    <GitHubContext.Provider
      value={{
        gitHubUser,
        repos,
        followers,
        requests,
        error,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export { GitHubProvider, GitHubContext };
