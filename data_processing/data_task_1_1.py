from data_handle import user_data_dict, user_dict
import csv
import datetime

# for user in user_data_dict:
#     print(user)
#     for j in user_data_dict[user]:print(j)

user=int(input())
user_data = user_data_dict[user]

#일단은 지금 figma에 있는 형식 그대로 2차원 list를 만들고, 이걸 csv로 저장하는 식으로 만들었습니다.

stress_table = [[[0,0]for i in range(12)] for i in range(7)]

for data in user_data:
    weekday = datetime.date(data.year, data.month, data.day).weekday()
    hour_ind = (data.hour)-10
    if 0<=hour_ind<12: #handle only between 10am to 10pm
        stress_table[weekday][hour_ind][0]+=data.stress
        stress_table[weekday][hour_ind][1]+=1 #to count

with open(f'data_processing/{user}_stress_by_day_time.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    for i in range(7):
        row=[]
        for j in range(12):
            stress, ct = stress_table[i][j]
            if ct==0:row.append(-1) #null
            else:row.append(stress/ct)
        writer.writerow(row)