import sqlite3

def database_add(cursor, query):
    try:
        cursor.execute(query)

    except sqlite3.Error as error:
        return 'Error occurred - ' + str(error)