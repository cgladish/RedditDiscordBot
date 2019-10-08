/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("subreddits", {
    id: {
      type: "varchar(255)",
      primaryKey: true
    },
    viewed_index: {
      type: "int",
      notNull: true,
      default: 0
    }
  });
  pgm.createTable("submissions", {
    id: {
      type: "varchar(255)",
      primaryKey: true
    },
    subreddit_id: {
      type: "varchar(255)",
      notNull: true,
      references: '"subreddits"',
      onDelete: "cascade"
    }
  });
  pgm.createIndex("submissions", "subreddit_id");
};

exports.down = pgm => {
  pgm.dropIndex("submissions", "subreddit_id");
  pgm.dropTable("submissions");
  pgm.dropTable("subreddits");
};
