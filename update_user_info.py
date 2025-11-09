import sqlite3
from database_updater import database_update

def update_user(cursor, user_id, likes_hiking, likes_reading, likes_cooking):
    statement = "UPDATE user_info" \
    "SET likes_hiking = "+str(likes_hiking)+", likes_reading = "+str(likes_reading)+", likes_cooking = "+str(likes_cooking)+"" \
    "WHERE user_id = "+str(user_id)+";"

    database_update(cursor, statement)

