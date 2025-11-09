from database_retriever import database_query

def username_to_id(cursor, username):
    query = "SELECT user_id FROM users WHERE username = '"+str(username)+"';"

    user_id = list(database_query(cursor, query)[0])[0]

    return user_id