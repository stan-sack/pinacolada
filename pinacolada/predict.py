import os
import cv2
import sys

import numpy as np

import processing
import utils


def step_flow(flow, step):
    f = flow.copy()
    print(f.shape)
    for f in flow:
        for e in f:
            print(f)
            e[0] = e[0] * step
            e[1] = e[1] * step
    print "ddd" 
    print f.shape
    return f
    


def main(argv):
    image_prefix = argv[0]
    from_path = argv[1]
    to_path = argv[2]
    steps = int(argv[3])

    images_to_process = utils.get_images_in_dir(from_path, image_prefix)
    print(image_prefix, images_to_process)

    if len(images_to_process) == 0:
        return

    count = 0
    prev = processing.load_image(os.path.join(from_path, images_to_process.pop(0)), to_gray=True)

    while images_to_process:
        next_name = images_to_process.pop(0)
        next = processing.load_image(os.path.join(from_path, next_name))
        print(os.path.basename(next_name))
        print(prev.shape)
        print(next.shape)

        flow = cv2.calcOpticalFlowFarneback(prev, next, 0.5, 3, 15, 3, 5, 1.2, 0)
                       
        time_stamp = utils.get_time_stamp(next_name)
        composite_img = np.zeros((next.shape[0],next.shape[1], 1), np.uint8)
        pred_img = next
        step = 1
        for t in utils.time_stamps(time_stamp, steps):
            pred_img = processing.apply_flow(pred_img, flow)
            
            #processing.apply_flow(next, step_flow(flow, step)) 
            composite_img = cv2.add(composite_img, pred_img)

            step += 1

            name = '{}_{}.png'.format(os.path.basename(next_name), t)
            print(name)
            cv2.imwrite(os.path.join(to_path, name), pred_img)

        comp_name = '{}_composite.png'.format(os.path.basename(next_name))
        cv2.imwrite(os.path.join(to_path, comp_name), composite_img)                                                                                                                                                             
        prev = next


if __name__ == '__main__':
    main(sys.argv[1:])
        

#if __name__ == '__main__':
#    main(sys.argv[1:])
#prev = load_image_as_grayscale(images.pop(0))

#while images:
#    next_name = images.pop(0)
#    next = load_image(next_name)
#    print(os.path.basename(next_name))
#    print(prev.shape)
#    print(next.shape)

#    flow = cv2.calcOpticalFlowFarneback(prev, next, 0.5, 3, 15, 3, 5, 1.2, 0)

    # predict 5 frames in to the future
#    pred_img = next
#    for i in range(5):
#        pred_img = apply_flow(pred_img, flow)
#        name = '{}_{}.png'.format(os.path.basename(next_name), i)
#        print(name)
#        cv2.imwrite(os.path.join(to_path, name), pred_img)


    # finally
#    prev = next





