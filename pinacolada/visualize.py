import cv2
import numpy as np

import processing
import utils

def create_image(images, scale=1.0):
    ims = []
    for i in images:
        ims.append(cv2.resize(i, (0,0), fx=scale, fy=scale))
    return np.concatenate(ims, axis=1)
