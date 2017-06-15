import os
import sys

import cv2
import numpy as np


# Map from BOM radar to gray intensity, where higher intensity means more rain
BOM_COLOURS = {
    (255, 245, 245): 15,
    (255, 180, 180): 30,
    (255, 120, 120): 45,
    (255, 20, 20): 60,
    (195, 216, 0): 75,
    (144, 150, 0): 90,
    (102, 102, 0): 105,
    (0, 255, 255): 120,
    (0, 200, 255): 135,
    (0, 150, 255): 150,
    (0, 100, 255): 165,
    (0, 0, 255): 180,
    (0, 0, 200): 195
}


def to_bom_grayscale(img):
    bom_img = np.zeros((img.shape[0],img.shape[1], 1), np.uint8)
    for x in range(img.shape[1]):
        for y in range(img.shape[0]):
            b,g,r = img[y,x]
            if (b, g, r) in BOM_COLOURS:
                bom_img[y,x] = BOM_COLOURS[(b, g, r)]
    return bom_img


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
