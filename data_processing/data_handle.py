import csv

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
            user_dict[int(line[0])] = {"Age": int(line[-2]), "Gender": line[-1]}
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
            user_data_dict[user].append(esm_data)
        except:continue