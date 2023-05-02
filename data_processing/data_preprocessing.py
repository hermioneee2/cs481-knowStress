import csv
import glob
from data_handle import user_dict
import pandas as pd

app_category_dict = dict()
category = pd.read_excel('data_processing/앱 분류 리스트.xlsx')
for row in category.iterrows():
    app_category_dict[row[1]['앱 이름']] = row[1]['분류']

#app usage
category = ['', 'Social media', 'Game', 'Messenger',
            'Video/Contents', 'Utility', 'etc']
for user in user_dict:
    user_dict[user]['app_time'] = 0
    for i in range(1, 7):
        user_dict[user][f'{category[i]} app time'] = 0
    file_list = glob.glob(f"data_processing/data/P{'0'*(user<1000)}{user}/AppUsageStatEntity*")
    for file in file_list:
        file=file.replace('\\', '/')
        with open(file, encoding='UTF8') as f:
            reader = csv.reader(f)
            for line in reader:
                try:
                    app_name = line[1]
                    if app_name not in app_category_dict or app_category_dict[app_name] == 7:continue
                    tot_time = int(line[-1])
                    user_dict[user]['app_time']+=tot_time
                    user_dict[user][f'{category[app_category_dict[app_name]]} app time'] += tot_time
                except:continue

#moved distance/activities
for user in user_dict:
    user_dict[user]['activity'] = 0
    file_list = glob.glob(f"data_processing/data/P{'0'*(user<1000)}{user}/PhysicalActivityEventEntity*")
    for file in file_list:
        file=file.replace('\\', '/')
        with open(file, encoding='UTF8') as f:
            reader = csv.reader(f)
            time_stamp_dict = dict()
            last_time = -1
            for line in reader:
                try:
                    time = int(line[0])
                    time_stamp_dict[time] = 0
                    if last_time!=time and last_time != -1:
                        time_stamp_dict[last_time] = (time-last_time)
                    last_time = time
                except:continue
        with open(file, encoding='UTF8') as f:
            reader = csv.reader(f)
            for line in reader:
                try:
                    activity_type = line[-1]
                    if activity_type in ['STILL', 'IN_VEHICLE', 'UNKNOWN']:continue
                    tot_time = time_stamp_dict[int(line[0])]*float(line[1])
                    user_dict[user]['activity']+=tot_time
                except:continue

#avg location
for user in user_dict:
    count = 0
    user_dict[user]['longitude'] = 0
    user_dict[user]['latitude'] = 0
    file_list = glob.glob(f"data_processing/data/P{'0'*(user<1000)}{user}/LocationEntity*")
    for file in file_list:
        with open(file, encoding='UTF8') as f:
            reader = csv.reader(f)
            for line in reader:
                try:
                    now_time = int(line[0])
                    lon, lat, alt=float(line[2]), float(line[3]), float(line[1])
                    count+=1
                    user_dict[user]['longitude'] += lon
                    user_dict[user]['latitude'] += lat
                except:continue
    if count:
        user_dict[user]['longitude'] /= count
        user_dict[user]['latitude'] /= count
for user in user_dict:
    try:
        user_dict[user]['avg_stress'] = user_dict[user]['tot_stress']/user_dict[user]['stress_ct']
    except:continue
labels = ['user_id',"Age", 'Gender', 'tot_stress', 'stress_ct', 'activity', 'avg_stress', 'app_time', 'longitude', 'latitude']
for i in range(1, 7):labels.append(f'{category[i]} app time')
with open('data_processing/data/modified_user_info.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=labels)
    writer.writeheader()
    for user in user_dict:
        user_info = user_dict[user]
        user_info['user_id']=user
        writer.writerow(user_info)