import csv
import glob

user_dict = dict()
user_data_dict=dict()

def time_parser(s):
    #2019-04-29T13:06:20.000+09:00 -> year:2019, month:04, day:29, hour:13, minute: 06, second:20
    year = int(s[:4])
    month = int(s[5:7])
    day = int(s[8:10])
    L=s.split('T')
    hour=int(L[1][:2])
    minute=int(L[1][3:5])
    second=int(L[1][6:8])
    return [year, month, day, hour, minute, second]
    
class ESM_data:
    def __init__(self, user, time_string, stress):
        L=time_parser(time_string)
        self.user = user
        self.stress = stress+3
        self.year, self.month, self.day, self.hour, self.minute, self.second = L
    
    def __str__(self):
        return f"User: {self.user}\nStress: {self.stress}\nTime: {self.year}.{self.month}.{self.day} {'0'*(self.hour<10)}{self.hour}:{'0'*(self.minute<10)}{self.minute}:{'0'*(self.second<10)}{self.second}\n"

with open('data_processing/data/user_info.csv') as user_info:
    reader = csv.reader(user_info)
    for line in reader:
        try:
            user_dict[int(line[0])] = {"Age": int(line[-2]), "Gender": line[-1], 'tot_stress': 0, 'stress_ct':0}
            user_data_dict[int(line[0])]=[]
        except:continue

with open('data_processing/data/esm_data.csv') as esm:
    reader = csv.reader(esm)
    for line in reader:
        try:
            user = int(line[0])
            time_string = line[1]
            stress = int(line[6])
            esm_data = ESM_data(user, time_string, stress)
            user_dict[user]['tot_stress']+=(stress+3)
            user_dict[user]['stress_ct']+=1
            user_data_dict[user].append(esm_data)
        except:continue

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