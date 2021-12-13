type Environment = {
	githubToken: string;
};

const environment: Environment = {
	githubToken: process.env['GITHUB_TOKEN']
};
export default environment;
