# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = "a024c70512fd4c08b3a302a43bdd11be"

@app.get("/attractions")
def get_paris_attractions():
    # Geocode Paris
    geo_resp = requests.get(
        f"https://api.geoapify.com/v1/geocode/search?text=Paris&apiKey={API_KEY}"
    )
    if geo_resp.status_code != 200:
        return {"places": []}

    geo_data = geo_resp.json()
    coords = geo_data["features"][0]["geometry"]["coordinates"]
    lon, lat = coords

    # Get nearby attractions
    places_resp = requests.get(
        f"https://api.geoapify.com/v2/places?"
        f"categories=tourism.attraction&filter=circle:{lon},{lat},10000&limit=10&apiKey={API_KEY}"
    )
    if places_resp.status_code != 200:
        return {"places": []}

    places_data = places_resp.json()
    attractions = [f.get("properties", {}).get("name") for f in places_data.get("features", []) if f.get("properties", {}).get("name")]
    
    return {"places": attractions[:5]}
