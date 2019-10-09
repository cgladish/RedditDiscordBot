import pgClient from "../../pgClient";

export const getSubreddit = async subreddit => {
  const res = await pgClient.query(
    `SELECT * FROM subreddits WHERE id='${subreddit}'`
  );
  return res.rows[0];
};

export const getSubmission = async (submissionId, subreddit) => {
  const res = await pgClient.query(
    `SELECT * FROM submissions WHERE ID='${submissionId}' AND subreddit_id='${subreddit}'`
  );
  return res.rows[0];
};

export const addSubreddit = async subreddit => {
  await pgClient.query(`INSERT INTO subreddits (id) VALUES ('${subreddit}')`);
};

export const addSubmission = async (submissionId, subreddit) => {
  pgClient.query(
    `INSERT INTO submissions VALUES ('${submissionId}', '${subreddit}')`
  );
};

export const setSubredditViewedIndex = async (subreddit, viewedIndex) => {
  await pgClient.query(
    `UPDATE subreddits SET viewed_index=${viewedIndex} WHERE id='${subreddit}'`
  );
};
