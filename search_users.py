import sqlite3
from database_retriever import database_query

def search_compatable_users(cursor, user_id):
    query = "SELECT likes_hiking, likes_reading, likes_cooking FROM user_info WHERE user_id = '"+str(user_id)+"';"

    hobbies = list(database_query(cursor, query)[0])

    query = "SELECT user_id FROM user_info WHERE (likes_hiking = '"+str(hobbies[0])+"' OR likes_reading = '"+str(hobbies[1])+"' OR likes_cooking = '"+str(hobbies[2])+"') AND NOT user_id = '"+str(user_id)+"';"

    soulmate_id = list(database_query(cursor, query)[0])
    if len(soulmate_id) == 0:
        return "No matches"

    return soulmate_id[0]