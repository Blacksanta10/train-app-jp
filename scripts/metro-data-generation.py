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
# Format: [Station Name, Kanji, Line Name, Station Number, Is Interchange(1=multiple-lines)]
raw_data = [

## Toei Line -----------------------------------------------------

    # Asakusa Line (20 stations)
    ['Nishi-magome', '西馬込', 'Asakusa', '01', 0],
    ['Magome', '馬込', 'Asakusa', '02', 0],
    ['Nakanobu', '中延', 'Asakusa', '03', 0],
    ['Togoshi', '戸越', 'Asakusa', '04', 0],
    ['Gotanda', '五反田', 'Asakusa', '05', 1],
    ['Takanawadai', '高輪台', 'Asakusa', '06', 0],
    ['Sengakuji', '泉岳寺', 'Asakusa', '07', 1],
    ['Mita', '三田', 'Asakusa', '08', 1],
    ['Daimon', '大門', 'Asakusa', '09', 1],
    ['Shimbashi', '新橋', 'Asakusa', '10', 1],
    ['Higashi-ginza', '浅東銀座', 'Asakusa', '11', 1],
    ['Takaracho', '宝町', 'Asakusa', '12', 0],
    ['Nihombashi', '日本橋', 'Asakusa', '13', 1],
    ['Ningyocho', '人形町', 'Asakusa', '14', 1],
    ['Bakuro-yokoyama', '馬喰横山', 'Asakusa', '15', 1],
    ['Asakusabashi', '浅草橋', 'Asakusa', '16', 0],
    ['Kuramae', '蔵前', 'Asakusa', '17', 1],
    ['Asakusa', '浅草', 'Asakusa', '18', 1],
    ['Honjo-azumabashi', '本所吾妻橋', 'Asakusa', '19', 0],
    ['Oshiage', '押上', 'Asakusa', '20', 0],

    # Mita Line (27 stations)
    ['Meguro','目黒', 'Mita', '01', 1],
    ['Shirokanedai','白金台', 'Mita', '02', 1],
    ['Shirokane-takanawa','白金高輪', 'Mita', '03', 1],
    ['Mita','三田', 'Mita', '04', 1],
    ['Shibakoen','芝公園', 'Mita', '05', 0],
    ['Onarimon','御成門', 'Mita', '06', 0],
    ['Uchisaiwaicho','内幸町', 'Mita', '07', 0],
    ['Hibiya','日比谷', 'Mita', '08', 1],
    ['Otemachi','大手町', 'Mita', '09', 1],
    ['Jimbocho','神保町', 'Mita', '10', 1],
    ['Suidobashi','水道橋', 'Mita', '11', 1],
    ['Kasuga','春日', 'Mita', '12', 1],
    ['Hakusan','白山', 'Mita', '13', 0],
    ['Sengoku','千石', 'Mita', '14', 0],
    ['Sugamo','巣鴨', 'Mita', '15', 1],
    ['Nishi-sugamo','西巣鴨', 'Mita', '16', 1],
    ['Shin-Itabashi','新板橋', 'Mita', '17', 1],
    ['Itabashi-kuyakushomae','板橋区役所前', 'Mita', '18', 0],
    ['Itabashi-honcho','板橋本町', 'Mita', '19', 0],
    ['Motohasunuma','本蓮沼', 'Mita', '20', 0],
    ['Shimura-sakaue','志村坂上', 'Mita', '21', 0],
    ['Shimura-sanchome','志村三丁目', 'Mita', '22', 0],
    ['Hasune','蓮根', 'Mita', '23', 0],
    ['Nishidai','西台', 'Mita', '24', 0],
    ['Takashimadaira','高島平', 'Mita', '25', 0],
    ['Shin-takashimadaira','新高島平', 'Mita', '26', 0],
    ['Nishi-takashimadaira','西高島平', 'Mita', '27', 0],

    # Shinjuku Line (21 stations)
    #[Station Name, Kanji, Line Name, Station Number, Is Interchange(1=multiple-lines)]
    ['Shinjuku', '新宿', 'Shinjuku', '01', 1],
    ['Shinjuku-sanchome', '新宿三丁目', 'Shinjuku', '02', 1],
    ['Akenbonobashi', '曙橋', 'Shinjuku', '03', 0],
    ['Ichigaya', '市ヶ谷', 'Shinjuku', '04', 1],
    ['Kudanshita', '九段下', 'Shinjuku', '05', 1],
    ['Jimbocho', '神保町', 'Shinjuku', '06', 1],
    ['Ogawamachi', '小川町', 'Shinjuku', '07', 1],
    ['Iwamotocho', '岩本町', 'Shinjuku', '08', 1],
    ['Bakuro-yokohama', '馬喰横山', 'Shinjuku', '09', 1],
    ['Hamacho', '浜町', 'Shinjuku', '10', 0],
    ['Morishita', '森下', 'Shinjuku', '11', 1],
    ['Kikukawa', '菊川', 'Shinjuku', '12', 0],
    ['Sumiyoshi', '住吉', 'Shinjuku', '13', 1],
    ['Nishi-ojima', '西大島', 'Shinjuku', '14', 0],
    ['Ojima', '大島', 'Shinjuku', '15', 0],
    ['Higashi-ojima', '東大島', 'Shinjuku', '16', 0],
    ['Funabori', '船堀', 'Shinjuku', '17', 0],
    ['Ichinoe', '一之江', 'Shinjuku', '18', 0],
    ['Mizue', '瑞江', 'Shinjuku', '19', 0],
    ['Shinozaki', '篠崎', 'Shinjuku', '20', 0],
    ['Motoyawata', '本八幡', 'Shinjuku', '21', 1],

    # Oedo Line (38 stations)
    


## Tokyo Metro Line --------------------------------------------

    # Ginza Line (19 stations)

    # Marunouchi Line (~25 stations)

    # Hibiya Line (22 stations)

    # Tozai Line (23 stations)

    # Chiyoda Line (20 stations)

    # Yurakucho Line (24 stations)

    # Hanzomon Line (14 stations)

    # Namboku Line (19 stations)

    # Fukutoshin Line (16 stations)

## Keio Railways

    # All 7 Keio Lines


# Other important --------------------------------------------------------

    # Chuo Sobu Line 

    # Yamanote Line



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