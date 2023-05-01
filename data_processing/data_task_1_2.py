from data_handle import user_data_dict
import glob
import csv

user=int(input())
#user uid를 입력하면 csv파일이 나오는 형식. data_processing 파일 안에 data라는 파일과 그 안에 데이터들이 있어야 작동.

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

    app_dict = dict()
    for file in file_list:
        file=file.replace('\\', '/')
        with open(file, encoding='UTF8') as f:
            reader = csv.reader(f)
            for line in reader:
                try:
                    app_name = line[1]
                    if app_name in ["시스템 UI", "빅스비 홈", "파인더", "내 파일", 
                                    "Wi-Fi 다이렉트", "블루투스", "Logger","시계",'ABC Logger',
                                    "삼성 키보드", "설정", "디바이스 관리", "안드로이드 시스템",
                                    "패키지 설치 프로그램", ""]:continue
                    #todo: 더미들, 빼야 할 다른 앱들 추가 확인
                    start_time, end_time = int(line[5]), int(line[6])
                    if app_name not in app_dict:app_dict[app_name] = [0, 0]
                    for timestamp in user_data_by_time:
                        if start_time <= timestamp*1000 <= end_time:
                            app_dict[app_name][0] += user_data_by_time[timestamp]
                            app_dict[app_name][1] += 1
                except:continue
    with open(f'data_processing/{user}_stress_by_app_using.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        for app in app_dict:
            stress, count = app_dict[app]
            if count>0:writer.writerow([app, stress/count])
    
    #todo: 앱 카테고리 별 분류
except:pass