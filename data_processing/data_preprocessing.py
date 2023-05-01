import csv
import glob
from data_handle import user_dict
#app usage
for user in user_dict:
    user_dict[user]['app_time'] = 0
    file_list = glob.glob(f"data_processing/data/P{'0'*(user<1000)}{user}/AppUsageStatEntity*")
    for file in file_list:
        file=file.replace('\\', '/')
        with open(file, encoding='UTF8') as f:
            reader = csv.reader(f)
            for line in reader:
                try:
                    app_name = line[1]
                    if app_name == "시스템 UI" or app_name == 'ABC Logger':continue
                    tot_time = int(line[-1])
                    user_dict[user]['app_time']+=tot_time
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

for user in user_dict:
    try:
        user_dict[user]['avg_stress'] = user_dict[user]['tot_stress']/user_dict[user]['stress_ct']
    except:continue
labels = ['user_id',"Age", 'Gender', 'tot_stress', 'stress_ct', 'app_time', 'activity', 'avg_stress']
with open('data_processing/data/modified_user_info.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=labels)
    writer.writeheader()
    for user in user_dict:
        user_info = user_dict[user]
        user_info['user_id']=user
        writer.writerow(user_info)