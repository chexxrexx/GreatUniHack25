import pandas as pd
import math

def csv_search(csv, lat, lon):
    # Load the original CSV
    df = pd.read_csv(csv)

    # Calculate distance from your coordinates to every airport
    df['distance_km'] = df.apply(lambda row: math.sqrt((lat - row['latitude_deg']) ** 2 + (lon - row['longitude_deg']) ** 2), axis=1)

    # Find the row with the smallest distance
    closest_airport = df.loc[df['distance_km'].idxmin()]

    return closest_airport['name'] + ", " + closest_airport['iso_country']
