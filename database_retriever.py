import sqlite3

def database_query(cursor, query):
    try:
        cursor.execute(query)

        return cursor.fetchall()

    except sqlite3.Error as error:
        return 'Error occurred - ' + str(error)