import csv

user_dict=dict()

with open('data_processing/data/modified_user_info.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:
        user_dict[int(row['user_id'])] = row

for user in user_dict:
    print(user)
    print(user_dict[user])