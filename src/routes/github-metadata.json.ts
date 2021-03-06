import type { RequestHandler } from '@sveltejs/kit';
import environment from '$lib/environment';
import { graphql } from '@octokit/graphql';

export const get: RequestHandler = async (request) => {
	const { user } = await graphql(
		`
			{
				user(login: "pepibumur") {
					bio
					followers {
						totalCount
					}
					following {
						totalCount
					}
					repositoriesContributedTo {
						totalCount
					}
				}
			}
		`,
		{
			headers: {
				authorization: `token ${environment.githubToken}`
			}
		}
	);
	const headers = {
		'Cache-Control': `max-age=0, s-max-age=${600}`,
		'Content-Type': 'application/json'
	};
	return {
		body: JSON.stringify({
			followers: user.followers.totalCount,
			following: user.following.totalCount,
			repositoriesContributedTo: user.repositoriesContributedTo.totalCount
		}),
		headers
	};
};
