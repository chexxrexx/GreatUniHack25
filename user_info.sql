CREATE TABLE user_info (
    user_id INTEGER NOT NULL,
    name Text NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL,

    /*ADD PROFILE PIC*/

    country TEXT NOT NULL,
    city TEXT NOT NULL,
    likes_hiking INTEGER DEFAULT 0,
    likes_reading INTEGER DEFAULT 0,
    likes_cooking INTEGER DEFAULT 0,
    FOREIGN KEY (user_id)
       REFERENCES users (user_id)
);