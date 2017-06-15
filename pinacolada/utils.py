from calendar import monthrange
import os


def get_images_in_dir(path, startswith='', as_dict=False, endswith='.png'):
    if as_dict:
        images = {}
    else:
        images = []
    print(path)
    for p, d, files in os.walk(path):
        for f in files:
            print(f, startswith)
            if f.endswith('.png') and (not startswith or f.startswith(startswith)):
                if as_dict:
                    images[f] = f
                else:
                    images.append(f)
    return images


def get_time_stamp(file_name):
    return file_name[-16:-4]


def time_stamps(cur_stamp, steps, step=6):
    cur_year = int(cur_stamp[0:4])
    cur_month = int(cur_stamp[4:6])
    cur_day = int(cur_stamp[6:8])
    cur_hour = int(cur_stamp[8:10])
    cur_min = int(cur_stamp[10:12])

    for i in range(steps):
        cur_min += step
        if cur_min == 60:
            cur_min = 0
            cur_hour += 1
            if cur_hour == 24:
                cur_hour = 0
                cur_day += 1
                if monthrange(cur_year, cur_month)[1] + 1 == cur_day:
                    cur_day = 1
                    cur_month += 1
                    if cur_month == 13:
                        cur_month = 1
                        cur_year += 1
        yield '{}{:02d}{:02d}{:02d}{:02d}'.format(cur_year, cur_month, cur_day, cur_hour, cur_min)
