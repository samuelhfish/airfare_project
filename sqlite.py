
import sqlite3
import pandas as pd
from pathlib import Path

# use pandas to create dataframe based on csv data
df_airfare_decrease2017 = pd.read_csv('cleaned_data.csv')

# create a sqlite database and a connection to it
cnxn = sqlite3.connect('airfare_2017.db')
crsr = cnxn.cursor()

# Recreate the table with the primary key constraint
create_table_new = '''
    CREATE TABLE airfare_decrease2017NEW (
        id INTEGER PRIMARY KEY,
        Year INTEGER,
        quarter INTEGER,
        city1 STRING,
        city2 STRING,
        cur_passenger FLOAT,
        cur_fare FLOAT,
        ly_fare FLOAT,
        ly_passenger FLOAT,
        amount_change FLOAT,
        percent_change FLOAT,
        amount_change_pax FLOAT,
        percent_change_pax FLOAT,
        Latitude1 FLOAT,
        Longitude1 FLOAT,
        Latitude2 FLOAT,
        Longitude2 FLOAT
    );
'''
crsr.execute(create_table_new)

# insert your dataframes into that database
df_airfare_decrease2017.to_sql('airfare_decrease2017NEW', cnxn, if_exists='replace', index=False)


cnxn.close()


