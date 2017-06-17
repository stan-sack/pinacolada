import os
import sys
import time

import cv2
import numpy as np

import processing
import utils


def main(argv):
    image_prefix = argv[0]
    from_path = argv[1]
    sleep = float(argv[2])

    images_to_play = utils.get_images_in_dir(from_path, image_prefix)

    images_to_play.sort()

    count = 1
    for i in images_to_play:
        print('Playing {} {}/{} images'.format(i, count, len(images_to_play)))
        im = cv2.imread(os.path.join(from_path, i))
        cv2.imshow('Play'.format(from_path), im)
        
        k = cv2.waitKey(30) & 0xff
        if k == 27:
            break
        
        count += 1
        time.sleep(sleep)
        

if __name__ == '__main__':
    main(sys.argv[1:])
