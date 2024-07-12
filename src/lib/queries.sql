--! Any queries done in supabse add them here
--? creating tables
CREATE TABLE IF NOT EXISTS category(
  id SERIAL PRIMARY KEY,
  cat_name TEXT
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  cat_id INTEGER,
  FOREIGN KEY ("cat_id") REFERENCES category ("id")
);

CREATE TABLE IF NOT EXISTS comments(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  comment TEXT,
  post_id INTEGER,
  FOREIGN KEY ("post_id") REFERENCES posts ("id")
);

--? Adding categories to the category table
INSERT INTO category (cat_name) VALUES 
('Happy'),
('Positive'),
('Hopeful'),
('Sad'),
('Angry'),
('Shameful');