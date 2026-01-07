# This script is used to generate a csv file of the tokyo and toei lines
# This suggestion is from AI, it prevents myself from typing redundant data over and over again

import pandas as pd


# 1. Define the Line Metadata (The "Rules" for your lines)
line_metadata = {
    # --- TOKYO METRO ---
    'Ginza': {'code_letter': 'G', 'color': '#FF9500', 'owner': 'Tokyo Metro'},
    'Marunouchi': {'code_letter': 'M', 'color': '#F62E36', 'owner': 'Tokyo Metro'},
    'Hibiya': {'code_letter': 'H', 'color': '#B5B5AC', 'owner': 'Tokyo Metro'},
    'Tozai': {'code_letter': 'T', 'color': '#009BBF', 'owner': 'Tokyo Metro'},
    'Chiyoda': {'code_letter': 'C', 'color': '#00BB85', 'owner': 'Tokyo Metro'},
    'Yurakucho': {'code_letter': 'Y', 'color': '#C1A470', 'owner': 'Tokyo Metro'},
    'Hanzomon': {'code_letter': 'Z', 'color': '#8F76D6', 'owner': 'Tokyo Metro'},
    'Namboku': {'code_letter': 'N', 'color': '#00AC9B', 'owner': 'Tokyo Metro'},
    'Fukutoshin': {'code_letter': 'F', 'color': '#9C5E31', 'owner': 'Tokyo Metro'},
    
    # --- TOEI SUBWAY ---
    'Asakusa': {'code_letter': 'A', 'color': '#EC6E65', 'owner': 'Toei'},
    'Mita': {'code_letter': 'I', 'color': '#006CB6', 'owner': 'Toei'},
    'Shinjuku': {'code_letter': 'S', 'color': '#B0C124', 'owner': 'Toei'},
    'Oedo': {'code_letter': 'E', 'color': '#CE045B', 'owner': 'Toei'}
}

# 2. Your Station Data (The "Input")
# Format: [Station Name, Kanji, Line Name, Station Number, Is Interchange]
raw_data = [
    ['Asakusa', '浅草', 'Ginza', '19', 1],
    ['Asakusa', '浅草', 'Asakusa', '18', 1],
    ['Shinjuku', '新宿', 'Marunouchi', '08', 1],
    ['Roppongi', '六本木', 'Oedo', '23', 1],
    ['Inaricho', '稲荷町', 'Ginza', '17', 0]
]

# 3. Process the data into a list of dictionaries
processed_data = []
for entry in raw_data:
    name, kanji, line, num, interchange = entry
    
    # Automatically pull metadata based on the line name
    meta = line_metadata.get(line)
    
    processed_data.append({
        'station_name': name,
        'station_kanji': kanji,
        'line_name': line,
        'system_owner': meta['owner'],
        'station_code': f"{meta['code_letter']}{num}",
        'line_color': meta['color'],
        'is_interchange': interchange,
    })

# 4. Convert to DataFrame and Save to CSV
df = pd.DataFrame(processed_data)
df.to_csv('tokyo_subway_dataset.csv', index=False, encoding='utf-8-sig')

print("Dataset created successfully!")