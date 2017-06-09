import os
import sys

import cv2
import numpy as np


# Get the originals


def apply_flow(img, flow):
    h, w = flow.shape[:2]
    flow = -flow
    flow[:,:,0] += np.arange(w)
    flow[:,:,1] += np.arange(h)[:,np.newaxis]
    res = cv2.remap(img, flow, None, cv2.INTER_LINEAR)
    return res



def load_image(file_name):
    img = cv2.imread(file_name)
    return cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

# for each original

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

prev = load_image(images.pop(0))

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





