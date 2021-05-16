import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GitHubContext = React.createContext();

const GitHubProvider = ({ children }) => {
	const [gitHubUser, setGitHubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);

	return (
		<GitHubContext.Provider
			value={{
				gitHubUser,
				repos,
				followers
			}}
		>
			{children}
		</GitHubContext.Provider>
	);
};

export { GitHubProvider, GitHubContext };
