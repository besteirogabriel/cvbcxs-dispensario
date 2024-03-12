import csv
from datetime import datetime

def convert_date(date_str):
    formats = ['%m/%y', '%m/%Y']
    for fmt in formats:
        try:
            return datetime.strptime(date_str, fmt).strftime('%Y-%m-%d')
        except ValueError:
            pass
    return None

def fix_dates(input_file, output_file):
    with open(input_file, 'r', newline='') as infile, open(output_file, 'w', newline='') as outfile:
        reader = csv.DictReader(infile)
        writer = csv.DictWriter(outfile, fieldnames=reader.fieldnames)
        writer.writeheader()
        for row in reader:
            row['FABRICACAO'] = convert_date(row['FABRICACAO'])
            row['VALIDADE'] = convert_date(row['VALIDADE'])
            writer.writerow(row)

if __name__ == "__main__":
    input_file = 'planilha.csv'
    output_file = 'fixed_planilha.csv'
    fix_dates(input_file, output_file)
    print(f"Dates fixed and written to {output_file}")
