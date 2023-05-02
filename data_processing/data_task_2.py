from data_handle import distance
import csv

user_dict=dict()

with open('data_processing/data/modified_user_info.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:
        user_dict[int(row['user_id'])] = row

act_min = 10**20
act_max = 1
app_min = 10**20
app_max = 1

def range_convert(mn, mx, start, end):
    d=mx-mn
    return (mn+d*start/100, mn+d*end/100)
for user in user_dict:
    app_time = float(user_dict[user]['app_time'])
    activity = float(user_dict[user]['activity'])
    
    if activity: act_min=min(activity, act_min)
    act_max=max(activity, act_max)
    if app_time: app_min=min(app_time, app_min)
    app_max=max(app_time, app_max)

# print(act_min, act_max, app_min, app_max)

#user_uid
user_id = int(input())
print("my age:", user_dict[user_id]['Age'])
print("min app time:", app_min)
print("max app time:", app_max)
print("my app time:", user_dict[user_id]['app_time'])
print("min activity time:", act_min)
print("max activity time:", act_max)
print("my activity time:", user_dict[user_id]['activity'])
#input format: min age, max age, min app, max app, min moved, max moved. default: 0 to 100
#모든 경우에 대해서 다 하는 건 사실상 불가능해서, 일단은 입력 받고 출력하는 식으로
age_from, age_until, app_from, app_until, act_from, act_until = map(int,input().split())
#선택하지 않은 경우 = rad가 -1
lon, lat, rad = map(float,input().split())

if lon==-1: lon = float(user_dict[user_id]['longitude'])
if lat==-1: lat = float(user_dict[user_id]['latitude'])

selected_user = []
selected_user_stress = []
for user in user_dict:
    age = int(user_dict[user]['Age'])
    app_time = float(user_dict[user]['app_time'])
    activity = float(user_dict[user]['activity'])
    if age<age_from or age>age_until: continue
    if (app_from, app_until) != (0, 100):
        st, ed = range_convert(app_min, app_max, app_from, app_until)
        if app_time<st or app_time>ed:continue
    if (act_from, act_until) != (0, 100):
        st, ed = range_convert(act_min, act_max, act_from, act_until)
        if activity<st or activity>ed:continue
    if rad != -1:
        dist = distance(float(user_dict[user]['latitude']), float(user_dict[user]['longitude']), lat, lon)
        if dist>rad:continue
    selected_user.append(user)
    selected_user_stress.append(float(user_dict[user]['avg_stress']))

selected_user_stress.sort()

if len(selected_user)==0:
    print("no such user exists")
elif user_id not in selected_user:
    print("range error: this user not in the range")
else:
    ct = 0
    for i in selected_user_stress[::-1]:
        if i>float(user_dict[user_id]['avg_stress']):
            ct+=1
        else:break
    print('my stress', user_dict[user_id]['avg_stress'])
    print('total', len(selected_user))
    percentile = (ct/len(selected_user_stress)*100)
    print('percentile', int(percentile))
    print('max', selected_user_stress[-1])
    print('75th', selected_user_stress[len(selected_user_stress)*3//4])
    print('mid', selected_user_stress[len(selected_user_stress)//2])
    print('25th', selected_user_stress[len(selected_user_stress)//4])
    print('min', selected_user_stress[0])