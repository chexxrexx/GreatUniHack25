import sqlite3
from database_pusher import database_add

def add_country(cursor, user_id, country_id):
    statement = "INSERT INTO users_countries" \
    "VALUES ("+str(user_id)+", "+str(country_id)+");"

    database_add(cursor, statement)

