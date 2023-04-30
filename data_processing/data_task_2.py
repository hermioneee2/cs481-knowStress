from data_handle import user_dict

act_min = 10**20
act_max = 1
app_min = 10**20
app_max = 1

def range_convert(mn, mx, start, end):
    d=mx-mn
    return (mn+d*start/100, mn+d*end/100)
for user in user_dict:
    app_time = user_dict[user]['app_time']
    activity = user_dict[user]['activity']
    
    if activity: act_min=min(activity, act_min)
    act_max=max(activity, act_max)
    if app_time: app_min=min(app_time, app_min)
    app_max=max(app_time, app_max)

print(act_min, act_max, app_min, app_max)

#input format: min age, max age, min app, max app, min moved, max moved. default: 0 to 100
age_from, age_until, app_from, app_until, act_from, act_until = map(int,input().split())

selected_user = []
for user in user_dict:
    age = user_dict[user]['Age']
    app_time = user_dict[user]['app_time']
    activity = user_dict[user]['activity']
    if age<age_from or age>age_until: continue
    if (app_from, app_until) != (0, 100):
        st, ed = range_convert(app_min, app_max, app_from, app_until)
        if app_time<st or app_time>ed:continue
    if (act_from, act_until) != (0, 100):
        st, ed = range_convert(act_min, act_max, act_from, act_until)
        if activity<st or activity>ed:continue
    selected_user.append(user)

print(selected_user)