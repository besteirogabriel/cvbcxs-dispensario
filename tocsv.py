import pandas as pd

# Read the CSV file
df = pd.read_csv('planilha.csv')

# Define function to convert date formats
def convert_date(date_str):
    try:
        return pd.to_datetime(date_str, format='%m/%y').strftime('%Y-%m-%d')
    except ValueError:
        pass
    try:
        return pd.to_datetime(date_str, format='%m/%d/%y').strftime('%Y-%m-%d')
    except ValueError:
        pass
    try:
        return pd.to_datetime(date_str, format='%m/%d').strftime('2025-%m-%d')
    except ValueError:
        pass
    try:
        return pd.to_datetime(date_str, format='%y').strftime('2025-%m-%d')
    except ValueError:
        return '2025-01-01'

# Apply the conversion function to the 'FABRICACAO' and 'VALIDADE' columns
df['FABRICACAO'] = df['FABRICACAO'].apply(convert_date)
df['VALIDADE'] = df['VALIDADE'].apply(convert_date)

# Write the result to another CSV file
df.to_csv('fixed_planilha.csv', index=False)
