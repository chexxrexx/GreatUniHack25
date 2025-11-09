import sqlite3
from database_retriever import database_query
from coordinate_geocoder import geocode_coords, find_airport
from search_users import search_compatable_users

try:
    sqliteConnection = sqlite3.connect('Holiday_Buddy.db')
    cursor = sqliteConnection.cursor()

    user_id=2
    soulmate_id = search_compatable_users(cursor, user_id)
    
    if (soulmate_id == "No matches"):
        soulmate_id = user_id + 1

    username1 = list(database_query(cursor, "SELECT name FROM user_info WHERE user_id = '"+str(user_id)+"'")[0])[0]
    username2 = list(database_query(cursor, "SELECT name FROM user_info WHERE user_id = '"+str(soulmate_id)+"'")[0])[0]

    person1_location = ", ".join(database_query(cursor, "SELECT COUNTRY, CITY FROM user_info WHERE name ='"+username1+"'")[0])
    person2_location = ", ".join(database_query(cursor, "SELECT COUNTRY, CITY FROM user_info WHERE name = '"+username2+"'")[0])

    location1, location2 = geocode_coords(person1_location, person2_location)

    print(find_airport(location1, location2))


except sqlite3.Error as error:
    print('Error occurred -', error)