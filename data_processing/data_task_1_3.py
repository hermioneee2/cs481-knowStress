from data_handle import user_data_dict
import glob
import csv
from geopy.geocoders import Nominatim

user=int(input())
#user uid를 입력하면 csv파일이 나오는 형식. data_processing 파일 안에 data라는 파일과 그 안에 데이터들이 있어야 작동.

def geocoding_reverse(lat, lng):
    print(lat, lng)
    geolocoder = Nominatim(user_agent = 'South Korea', timeout=None)
    address = geolocoder.reverse(f"{lat}, {lng}")
    print(address)
    return address

try:
    user_data_by_time = dict()
    with open('data_processing/data/esm_data.csv') as esm:
        reader = csv.reader(esm)
        for line in reader:
            try:
                if user==int(line[0]):
                    timestamp = int(line[2])
                    user_data_by_time[timestamp] = int(line[6])+3
            except:continue


    user_data = user_data_dict[user]
    file_list = glob.glob(f"data_processing/data/P{'0'*(user<1000)}{user}/LocationEntity*")

    loc_dict = dict()
    for file in file_list:
        file=file.replace('\\', '/')
        with open(file, encoding='UTF8') as f:
            reader = csv.reader(f)
            for line in reader:
                try:
                    now_time = int(line[0])
                    lon, lat, alt=float(line[2]), float(line[3]), float(line[1])
                    # addr = geocoding_reverse(lat, lon)
                    addr = (lon, lat, alt)
                    if addr not in loc_dict:loc_dict[addr]=[0,0]
                    for timestamp in user_data_by_time:
                        if (timestamp-60)*1000 <= now_time <= (timestamp+60)*1000:
                            loc_dict[addr][0] += user_data_by_time[timestamp]
                            loc_dict[addr][1] += 1
                except:continue
    with open(f'data_processing/{user}_stress_by_location.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        for loc in loc_dict:
            stress, count = loc_dict[loc]
            if count>0:writer.writerow([loc, stress/count])
            # if count>0:writer.writerow([geocoding_reverse(loc[1], loc[0]), stress/count])
    
except:pass