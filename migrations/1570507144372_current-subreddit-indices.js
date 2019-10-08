/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("subreddits", {
    id: {
      type: "varchar(255)",
      primaryKey: true
    }
  });
  pgm.createTable("submissions", {
    id: {
      type: "varchar(255)",
      primaryKey: true
    },
    subredditId: {
      type: "varchar(255)",
      notNull: true,
      references: '"subreddits"',
      onDelete: "cascade"
    }
  });
  pgm.createIndex("submissions", "subredditId");
};

exports.down = pgm => {
  pgm.dropIndex("posts", "subredditId");
  pgm.dropTable("submissions");
  pgm.dropTable("subreddits");
};
