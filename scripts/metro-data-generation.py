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
    ['Shinjuku-nishiguchi', '新宿西口', 'Oedo', '01', 1],
    ['Higashi-shinjuku', '東新宿', 'Oedo', '02', 1],
    ['Wakamatsu-kawada', '若松河田', 'Oedo', '03', 0],
    ['Ushigome-yanagicho', '牛込柳町', 'Oedo', '04', 0],
    ['Ushigome-kagurazaka', '牛込神楽坂', 'Oedo', '05', 0],
    ['Iidabashi', '飯田橋', 'Oedo', '06', 1],
    ['Kasuga', '春日', 'Oedo', '07', 1],
    ['Hongo-sanchome', '本郷三丁目', 'Oedo', '08', 1],
    ['Ueno-okachimachi', '上野御徒町', 'Oedo', '09', 1],
    ['Shin-okachimachi', '新御徒町', 'Oedo', '10', 1],
    ['Kuramae', '蔵前', 'Oedo', '11', 1],
    ['Ryogoku', '両国', 'Oedo', '12', 1],
    ['Morishita', '森下', 'Oedo', '13', 1],
    ['Kiyosumi-shirakawa', '清澄白河', 'Oedo', '14', 1],
    ['Monzen-nakacho', '門前仲町', 'Oedo', '15', 1],
    ['Tsukishima', '月島', 'Oedo', '16', 1],
    ['Kachidoki', '勝どき', 'Oedo', '17', 0],
    ['Tsukijishijo', '築地市場', 'Oedo', '18', 0],
    ['Shiodome', '汐留', 'Oedo', '19', 1],
    ['Daimon', '大門', 'Oedo', '20', 1],
    ['Akabanebashi', '赤羽橋', 'Oedo', '21', 0],
    ['Azabu-juban', '麻布十番', 'Oedo', '22', 1],
    ['Roppongi', '	六本木', 'Oedo', '23', 1],
    ['Aoyama-itchome', '青山一丁目', 'Oedo', '24', 1],
    ['Kokuritsu-kyogijo', '国立競技場', 'Oedo', '25', 0],
    ['Yoyogi', '代々木', 'Oedo', '26', 1],
    ['Shinjuku', '新宿', 'Oedo', '27', 1],
    ['Tochomae', '都庁前', 'Oedo', '28', 1],
    ['Nishi-shinjuku-gochome', '西新宿五丁目', 'Oedo', '29', 0],
    ['Nakano-sakaue', '中野坂上', 'Oedo', '30', 1],
    ['Higashi-nakano', '東中野', 'Oedo', '31', 1],
    ['Nakai', '中井', 'Oedo', '32', 1],
    ['Ochiai-minami-nagasaki', '落合南長崎', 'Oedo', '33', 0],
    ['Shin-egota', '新江古田', 'Oedo', '34', 0],
    ['Nerima', '練馬', 'Oedo', '35', 1],
    ['Toshimaen', '	豊島園', 'Oedo', '36', 0],
    ['Nerima-kasugacho', '練馬春日町', 'Oedo', '37', 0],
    ['Hikarigaoka', '光が丘', 'Oedo', '38', 0],



#[Station Name, Kanji, Line Name, Station Number, Is Interchange]
## Tokyo Metro Line --------------------------------------------

    # Ginza Line (19 stations)
    ['Shibuya', '渋谷', 'Ginza', '01', 1],
    ['Omote-sando', '表参道', 'Ginza', '02', 1],
    ['Gaiemmae', '外苑前', 'Ginza', '03', 0],
    ['Aoyama-itchome', '青山一丁目', 'Ginza', '04', 1],
    ['Akasaka-mitsuke', '赤坂見附', 'Ginza', '05', 1],
    ['Tameike-sanno', '溜池山王', 'Ginza', '06', 1],
    ['Toranomon', '虎ノ門', 'Ginza', '07', 1],
    ['Shimbashi', '新橋', 'Ginza', '08', 1],
    ['Ginza', '銀座', 'Ginza', '09', 1],
    ['Kyobashi', '京橋', 'Ginza', '10', 0],
    ['Nihombashi', '日本橋', 'Ginza', '11', 1],
    ['Mitsukoshimae', '三越前', 'Ginza', '12', 1],
    ['Kanda', '神田', 'Ginza', '13', 1],
    ['Suehirocho', '末広町', 'Ginza', '14', 0],
    ['Ueno-hirokoji', '上野広小路', 'Ginza', '15', 1],
    ['Ueno', '上野', 'Ginza', '16', 1],
    ['Inaricho', '	稲荷町', 'Ginza', '17', 0],
    ['Tawaramachi', '田原町', 'Ginza', '18', 0],
    ['Asakusa', '浅草', 'Ginza', '19', 1],

    # Marunouchi Line (25 stations)
    ['Ogikubo', '荻窪', 'Marunouchi', '01', 1],
    ['Minami-asagaya', '南阿佐ケ谷', 'Marunouchi', '02', 0],
    ['Shin-koenji', '新高円寺', 'Marunouchi', '03', 0],
    ['Higashi-koenji', '東高円寺', 'Marunouchi', '04', 0],
    ['Shin-nakano', '新中野', 'Marunouchi', '05', 0],
    ['Nakano-sakaue', '中野坂上', 'Marunouchi', '06', 1],
    ['Nishi-shinjuku', '西新宿', 'Marunouchi', '07', 0],
    ['Shinjuku', '新宿', 'Marunouchi', '08', 1],
    ['Shinjuku-sanchome', '新宿三丁目', 'Marunouchi', '09', 1],
    ['Shinjuku-gyoemmae', '新宿御苑前', 'Marunouchi', '10', 0],
    ['Yotsuya-sanchome', '四谷三丁目', 'Marunouchi', '11', 0],
    ['Yotsuya', '四ツ谷', 'Marunouchi', '12', 1],
    ['Akasaka-mitsuke', '赤坂見附', 'Marunouchi', '13', 1],
    ['Kokkai-gijido-mae', '国会議事堂前', 'Marunouchi', '14', 1],
    ['Kasumigaseki', '霞ケ関', 'Marunouchi', '15', 1],
    ['Ginza', '銀座', 'Marunouchi', '16', 1],
    ['Tokyo', '東京', 'Marunouchi', '17', 1],
    ['Otemachi', '大手町', 'Marunouchi', '18', 1],
    ['Awajicho', '淡路町', 'Marunouchi', '19', 1],
    ['Ochanomizu', '御茶ノ水', 'Marunouchi', '20', 1],
    ['Hongo-sanchome', '本郷三丁目', 'Marunouchi', '21', 1],
    ['Korakuen', '後楽園', 'Marunouchi', '22', 1],
    ['Myogadani', '茗荷谷', 'Marunouchi', '23', 0],
    ['Shin-otsuka', '新大塚', 'Marunouchi', '24', 0],
    ['Ikebukuro', '	池袋', 'Marunouchi', '25', 1],


    # Hibiya Line (22 stations)
    ['Naka-meguro','中目黒','Hibiya', '01', 1],
    ['Ebisu','恵比寿','Hibiya', '02', 1],
    ['Hiro-o','広尾','Hibiya', '03', 0],
    ['Roppongi','六本木','Hibiya', '04', 1],
    ['Kamiyacho','神谷町','Hibiya', '05', 0],
    ['Toranomon Hills','虎ノ門ヒルズ','Hibiya', '06', 1],
    ['Kasumigaseki','霞ケ関','Hibiya', '07', 1],
    ['Hibiya','日比谷','Hibiya', '08', 1],
    ['Ginza','銀座','Hibiya', '09', 1],
    ['Higashi-ginza','東銀座','Hibiya', '10', 1],
    ['Tsukiji','築地','Hibiya', '11', 1],
    ['Hatchobori','八丁堀','Hibiya', '12', 1],
    ['Kayabacho','茅場町','Hibiya', '13', 1],
    ['Ningyocho','人形町','Hibiya', '14', 1],
    ['Kodemmacho','小伝馬町','Hibiya', '15', 0],
    ['Akihabara','秋葉原','Hibiya', '16', 1],
    ['Naka-okachimachi','仲御徒町','Hibiya', '17', 1],
    ['Ueno','上野','Hibiya', '18', 1],
    ['Iriya','入谷','Hibiya', '19', 0],
    ['Minowa','三ノ輪','Hibiya', '20', 0],
    ['Minami-senju','南千住','Hibiya', '21', 1],
    ['Kita-senju','中目黒','Hibiya', '22', 1]



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