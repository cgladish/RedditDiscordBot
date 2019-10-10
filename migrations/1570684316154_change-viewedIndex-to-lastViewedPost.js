/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.dropColumns("subreddits", ["viewed_index"]);
  pgm.addColumns("subreddits", {
    last_viewed_submission: {
      type: "varchar(255)",
      references: '"submissions"'
    }
  });
};

exports.down = pgm => {
  pgm.dropColumns("subreddits", ["last_viewed_submission"]);
  pgm.addColumns("subreddits", {
    viewed_index: {
      type: "int",
      notNull: true,
      default: 0
    }
  });
};
