CREATE TABLE users_countries (
    user_id INTEGER NOT NULL,
    country_id INTEGER NOT NULL,
    FOREIGN KEY (country_id)
       REFERENCES countries (country_id),
    FOREIGN KEY (user_id)
       REFERENCES users (user_id)
);