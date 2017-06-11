from calendar import monthrange
import os
import sys

import cv2
import numpy as np


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


for s in time_stamps('201706092312', 250):
    print(s)
print(get_time_stamp('processed/IDR714.T.201706090812.png'))
sys.exit(0)

def apply_flow(img, flow):
    """Apply flow matrix flow to the image img and return new image"""
    h, w = flow.shape[:2]
    flow = -flow
    flow[:,:,0] += np.arange(w)
    flow[:,:,1] += np.arange(h)[:,np.newaxis]
    res = cv2.remap(img, flow, None, cv2.INTER_LINEAR)
    return res


def load_image(file_name, to_gray=True):
    try:
        img = cv2.imread(file_name)
        if to_gray:
            return cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
        else:
            return img
    except:
        return None


images = [
    'processed/IDR714.T.201706090812.png',
    'processed/IDR714.T.201706090818.png',
    'processed/IDR714.T.201706090824.png',
    'processed/IDR714.T.201706090830.png',
    'processed/IDR714.T.201706090836.png',
    'processed/IDR714.T.201706090842.png',
    'processed/IDR714.T.201706090848.png',
    'processed/IDR714.T.201706090854.png'
]

to_path = 'predicted'

prev = load_image_as_grayscale(images.pop(0))

while images:
    next_name = images.pop(0)
    next = load_image(next_name)
    print(os.path.basename(next_name))
    print(prev.shape)
    print(next.shape)

    flow = cv2.calcOpticalFlowFarneback(prev, next, 0.5, 3, 15, 3, 5, 1.2, 0)

    # predict 5 frames in to the future
    pred_img = next
    for i in range(5):
        pred_img = apply_flow(pred_img, flow)
        name = '{}_{}.png'.format(os.path.basename(next_name), i)
        print(name)
        cv2.imwrite(os.path.join(to_path, name), pred_img)


    # finally
    prev = next





