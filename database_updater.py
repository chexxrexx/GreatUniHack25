import sqlite3

def database_update(cursor, statement):
    try:
        cursor.execute(statement)

    except sqlite3.Error as error:
        return 'Error occurred - ' + str(error)