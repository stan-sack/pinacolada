import os
import sys

import cv2
import numpy as np


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
