import os     
import cv2
import sys

import numpy as np

import processing
import utils


def main(argv):
    image_prefix = argv[0]
    from_path = argv[1]
    to_path = argv[2]

    images_to_process = utils.get_images_in_dir(from_path, image_prefix) 
    already_processed = utils.get_images_in_dir(to_path, image_prefix, as_dict=True)

    count = 0
    for i in images_to_process:
        if i not in already_processed:
            count += 1
            print('Processing {} {}/{} images'.format(i, count, len(images_to_process)))
            im = cv2.imread(os.path.join(from_path, i))
            img = processing.to_bom_grayscale(im)
            cv2.imwrite(os.path.join(to_path, i), img)
    

if __name__ == '__main__':
    main(sys.argv[1:])

