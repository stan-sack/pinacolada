import os
#import numpy as np
import cv2

import sys
import numpy as np

sleep = float(sys.argv[3])

path = sys.argv[2]
list_names = []

for p, d, files in os.walk(path):
    for f in files:
        if f.endswith('.png') and f.startswith(sys.argv[1]):
            list_names.append(f)

list_names.sort()

count = 0
first=True
while(1):
    print(count, len(list_names))
    print(list_names[count])
    img = cv2.imread(os.path.join(path, list_names[count]))
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(img, list_names[count],(10,40), font, 0.7,(255,255,255),1)# ,cv2.LINE_AA)
    count += 1
    print(img.shape)

    if first:
        screen_res = 1280, 720
        scale_width = screen_res[0] / img.shape[1]
        scale_height = screen_res[1] / img.shape[0]
        scale = min(scale_width, scale_height)
        window_width = int(img.shape[1] * scale)
        window_height = int(img.shape[0] * scale)
        
        cv2.namedWindow('Play {}'.format(sys.argv[1]), cv2.WINDOW_NORMAL)
        cv2.resizeWindow('Play {}'.format(sys.argv[1]), window_width, window_height)
        
    cv2.imshow('Play {}'.format(sys.argv[1]), img)
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

    import time
    time.sleep(sleep)

    if count == len(list_names):
        count = 0


cv2.destroyAllWindows()
cap.release()
