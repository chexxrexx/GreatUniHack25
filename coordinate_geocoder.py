from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
from airport_finder import csv_search

def geocode_coords(area1, area2):
    geolocator = Nominatim(user_agent='Holiday_Buddies')
    geocode = RateLimiter(geolocator.geocode, min_delay_seconds=1)

    location1 = geocode(area1, language='en')

    location2 = geocode(area2, language='en')

    return location1, location2

def find_airport(location1, location2):
    midpoint_latitude = (location1.latitude + location2.latitude) / 2
    midpoint_longitude = (location1.longitude + location2.longitude) / 2

    return csv_search("airports.csv", midpoint_latitude, midpoint_longitude)