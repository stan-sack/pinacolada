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
        for ti in utils.time_stamps(t, 3):
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

        diff_im = cv2.absdiff(real_im, pred_im)
        #cv2.imshow('Diff', diff_im)

        #comb = visualize.create_image([real_im, pred_im, diff_im], 0.8)
        #cv2.imshow('Combi', comb)

        nr_im= np.zeros((512, 512, 3), np.uint8)

        count = 0
        for i in range(512):
            for j in range(512):
        #        if abs(real_im[i, j][0] - pred_im[i, j][0]) > 240:
        #            nr_im[i, j] = [255, 255, 255]
                #if real_im[i, j][0] == 0 and pred_im[i, j][0] != 0:
                #    nr_im[i, j] = [255, 255, 255]
                if pred_im[i, j][0] == 0 and real_im[i, j][0] != 0:
                    nr_im[i, j] = [255, 255, 255]
                    count += 1
        print(count / (512.0*512.0))

        comb = visualize.create_image([real_im, pred_im, diff_im, nr_im], 0.65)
        cv2.imshow('Combi', comb)

        k = cv2.waitKey(30) & 0xff
        if k == 27:
            break

        time.sleep(0.2)

    return

if __name__ == '__main__':
    main(sys.argv[1:])
