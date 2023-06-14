import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from pathlib import Path
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Float, Integer
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

# # ######################################################
# # Create a base class for declarating class definitions to produce Table objects
Base = declarative_base()

# Create a reference to the dataset
database_path = Path("airfare_2017.db")

# Create Database Connection
engine = create_engine(f"sqlite:///{database_path}")
Base.metadata.create_all(engine)

# Create a Session Object to Connect to DB
session = Session(bind=engine)
session


class Airfare(Base):
    __tablename__ = 'airfare_decrease2017clean'
    id = Column(Integer, primary_key=True)
    Year = Column(Integer)
    quarter = Column(Integer)
    city1 = Column(String)
    city2 = Column(String)
    cur_passenger = Column(Float)
    cur_fare = Column(Float)
    ly_fare = Column(Float)
    ly_passenger = Column(Float)
    amount_change = Column(Float)
    percent_change = Column(Float)
    amount_change_pax = Column(Float)
    percent_change_pax = Column(Float)
    Latitude1 = Column(Float)
    Longitude1 = Column(Float)
    Latitude2 = Column(Float)
    Longitude2 = Column(Float)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################


@app.route("/")
def main_page():
    """
    Render the main page of the webapp.
    Please choose the route from available routes below.
    """
    return render_template('index.html')





@app.route("/api/v1.0/flights_by_departure")
def flights_by_departure():

    session = Session(engine)

    """Return a dictionary of route data including the departure city, arrival city, and price change."""

        # Query all passengers
    all_data = session.query(Airfare.city1, Airfare.city2, 
                            Airfare.amount_change, Airfare.percent_change, Airfare.amount_change_pax, Airfare.percent_change_pax, Airfare.Latitude2, Airfare.Longitude2).all()



    session.close()
    
    
    departure_dict = {}
    for row in all_data:
        departure_city = row["city1"]
        if departure_city in departure_dict:
            departure_dict[departure_city]["ToCities"].append(row["city2"])
            departure_dict[departure_city]["Rates"].append(row["amount_change"])
            departure_dict[departure_city]["PercentChangePrice"].append(row["percent_change"])
            departure_dict[departure_city]["PassengerChange"].append(row["amount_change_pax"])
            departure_dict[departure_city]["PercentChangePax"].append(row["percent_change_pax"])
            departure_dict[departure_city]["DestLat"].append(row["Latitude2"])
            departure_dict[departure_city]["DestLng"].append(row["Longitude2"])

        else:
            departure_dict[departure_city] = {
                "ToCities": [row["city2"]],
                "Rates": [row["amount_change"]],
                "PercentChangePrice": [row["percent_change"]],
                "PassengerChange": [row["amount_change_pax"]],
                "PercentChangePax": [row["percent_change_pax"]],
                "DestLat": [row["Latitude2"]],
                "DestLng": [row["Longitude2"]],
            }
    print(departure_dict)
    return jsonify(departure_dict)

@app.route("/api/v1.0/departures")
def departures():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a dictionary of route data including the departure city, arrival city, and price change."""

        # Query all passengers
    results = session.query(Airfare.id, Airfare.city1, Airfare.city2, 
                            Airfare.amount_change, Airfare.amount_change_pax).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_departures = []
    for id, city1, city2, amount_change, amount_change_pax in results:
        city_dict = {}
        city_dict["Index"] = id
        city_dict["Departure City"] = city1
        city_dict["Arrival City"] = city2
        city_dict["Price Changed"] = amount_change
        city_dict["Passenger Quantity Change"] = amount_change_pax
        all_departures.append(city_dict)

    return jsonify(all_departures)


if __name__ == '__main__':
    app.run(debug=True)