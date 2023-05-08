from data_handle import user_data_dict
import glob
import csv
import pandas as pd
from operator import itemgetter

user=int(input())
#user uid를 입력하면 csv파일이 나오는 형식. data_processing 파일 안에 data라는 파일과 그 안에 데이터들이 있어야 작동.

#앱 분류 리스트 설명
#xlsx로 저장되어 있어서 csv와 달리 ignore되지는 않음.
#1. 소셜 미디어
#2. 게임
#3. 메신저
#4. 비디오/웹툰/웹소설등 각종 컨텐츠들, 음악 등
#5. 유틸리티
#6. 브라우저
#7. 시스템(처리과정에서 제거됨), 기타(보안 프로그램, otp, 특정 휴대폰 관리 프로그램 등)
app_category_dict = dict()
category_list = ['', 'Social Media', 'Game', 'Messenger',
            'Video/Contents', 'Utility', 'Browser', ]
category = pd.read_excel('data_processing/앱 분류 리스트.xlsx')
for row in category.iterrows():
    app_category_dict[row[1]['앱 이름']] = row[1]['분류']

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
    file_list = glob.glob(f"data_processing/data/P{'0'*(user<1000)}{user}/AppUsageStatEntity*")

    app_time_by_category = [[0, 0] for i in range(6)]
    app_dict = dict()
    for file in file_list:
        file=file.replace('\\', '/')
        with open(file, encoding='UTF8') as f:
            reader = csv.reader(f)
            for line in reader:
                try:
                    app_name = line[1]
                    if app_name not in app_category_dict or app_category_dict[app_name] == 7:continue
                    start_time, end_time = int(line[5]), int(line[6])
                    if app_name not in app_dict:app_dict[app_name] = [0, 0]
                    for timestamp in user_data_by_time:
                        if start_time <= timestamp*1000 <= end_time:
                            app_dict[app_name][0] += user_data_by_time[timestamp]
                            app_dict[app_name][1] += 1

                            c = app_category_dict[app_name]
                            app_time_by_category[c-1][0] += user_data_by_time[timestamp]
                            app_time_by_category[c-1][1] += 1
                except:continue
    with open(f'data_processing/{user}_stress_by_app_using.csv', 'w', newline='') as f:
        writer = csv.writer(f, quoting=csv.QUOTE_ALL)
        # writer = csv.writer(f)
        # for i in range(1, 7):
        #     stress, count = app_time_by_category[i-1]
        #     writer.writerow([category_list[i], stress/count if count else -1])
        L=[]
        for app in app_dict:
            stress, count = app_dict[app]
            if count>0:L.append([app, category_list[app_category_dict[app]], stress/count, count])
        L.sort(key=itemgetter(3), reverse=True)
        LF = L[:15]
        LF.sort(key=itemgetter(2))
        for row in LF[:15]:
            writer.writerow(row[:3])
except:pass