import os
import sys
import time

import cv2
import numpy as np

import processing
import visualize
import utils


def main(argv):
    image_prefix = argv[0]
    real_path = argv[1]
    pred_path = argv[4]

    from_ts = argv[2]
    steps = int(argv[3])

    for t in utils.time_stamps(from_ts, steps):

        cur = ''
        for ti in utils.time_stamps(t, 4):
            cur = ti
        print(t, cur)
        
        # IDR714.T.201706070906.png_201706070918.png
        pred_name = '{}.{}.png_{}.png'.format('IDR714.T', t, cur)
        real_name = '{}.{}.png'.format('IDR714.T', cur)
        print(real_name, pred_name)
        
        real_im = cv2.imread(os.path.join(real_path, real_name))
        print(real_im.shape)
        #cv2.imshow('Real', real_im)

        pred_im = cv2.imread(os.path.join(pred_path, pred_name))
        print(pred_im.shape)
        #cv2.imshow('Pred', pred_im)

        diff_im = cv2.subtract(pred_im, real_im)
        #cv2.imshow('Diff', diff_im)

        comb = visualize.create_image([real_im, pred_im, diff_im], 0.8)
        cv2.imshow('Combi', comb)

        k = cv2.waitKey(30) & 0xff
        if k == 27:
            break

        time.sleep(0.2)

    return

    images_to_play = utils.get_images_in_dir(from_path, image_prefix)
    images_to_play.sort()

    count = 1
    for i in images_to_play:
        if bg != None:
            print(dir(bg))
            print(bg.shape)
            cv2.imshow('Backrgound', bg)
        
        print('Playing {} {}/{} images'.format(i, count, len(images_to_play)))
        im = cv2.imread(os.path.join(from_path, i))
        print(im.shape)
        cv2.imshow('Play'.format(from_path), im)

        imc = bg[6:518, 0:512] + im
        cv2.imshow('Combined'.format(from_path), imc)

        scale = 0.67
        comb = visualize.create_image([imc, im, im, im], 0.67)
        cv2.imshow('Combi', comb)

        k = cv2.waitKey(30) & 0xff
        if k == 27:
            break
        
        count += 1
        time.sleep(sleep)
        

if __name__ == '__main__':
    main(sys.argv[1:])
