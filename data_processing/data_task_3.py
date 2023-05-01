import csv

user_dict=dict()

def make_histogram(L):
    tot_len = len(L)
    L.sort()
    d=dict()
    for i in range(0, 100, 10):d[i]=[0,0]
    for i in range(tot_len):
        now = int(i/tot_len*10)
        d[now*10][0]+=L[i][1]
        d[now*10][1]+=1
    
    return d

with open('data_processing/data/modified_user_info.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:
        user_dict[int(row['user_id'])] = row

# for user in user_dict:
#     print(user)
#     print(user_dict[user])

#histogram by Age
age_dict=dict()
for i in range(15, 65, 5):age_dict[i]=[0, 0]

for user in user_dict:
    user_age = int(user_dict[user]['Age'])
    if user_age<15 or user_age>=65:continue
    now_age = (user_age//5)*5
    age_dict[now_age][0] += float(user_dict[user]['avg_stress'])
    age_dict[now_age][1] += 1

for age in age_dict:
    with open('data_processing/data/age_stress_distribution.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        for i in range(15, 65, 5):
            writer.writerow([f"{i}-{i+4}", age_dict[i][0]/age_dict[i][1] if age_dict[i][1] else 0])

#histogram by Movement
movement_list = []
for user in user_dict:
    if user_dict[user]['activity']=='0':continue
    movement_list.append((float(user_dict[user]['activity']), float(user_dict[user]['avg_stress'])))
movement_dict = make_histogram(movement_list)

for movement in movement_dict:
    with open('data_processing/data/movement_stress_distribution.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        for i in range(0, 100, 10):
            writer.writerow([f"{i}-{i+9} percentile", movement_dict[i][0]/movement_dict[i][1]])

#histogram by Sleep Time #todo

#histogram by total app usage time
app_time_list = []
for user in user_dict:
    if user_dict[user]['app_time']=='0':continue
    app_time_list.append((float(user_dict[user]['app_time']), float(user_dict[user]['avg_stress'])))
app_time_dict = make_histogram(app_time_list)

for app_time in app_time_dict:
    with open('data_processing/data/app_time_stress_distribution.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        for i in range(0, 100, 10):
            writer.writerow([f"{i}-{i+9} percentile", app_time_dict[i][0]/app_time_dict[i][1]])