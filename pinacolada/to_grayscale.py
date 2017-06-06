import os
#import numpy as np                                                                                                                                                                                 
import cv2

import sys
import numpy as np


from_path = sys.argv[2]
to_path = sys.argv[3]
images = []

already_processed = {}

for p, d, files in os.walk(to_path):
    for f in files:
        if f.endswith('.png') and f.startswith(sys.argv[1]):
            already_processed[f] = f

for p, d, files in os.walk(from_path):
    for f in files:
        if f.endswith('.png') and f.startswith(sys.argv[1]) and f not in already_processed:
            images.append(f)

images.sort()

colors = {
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


count = 0
total = len(images)
for i in images:
    count += 1
    print("Processing {}: {}/{}".format(i, count, total))
    img = cv2.imread(os.path.join(from_path, i))
    
    pimg = np.zeros((512,512, 1), np.uint8)
    
    for x in range(512):
        for y in range(512):

            b,g,r = img[y,x]
            if (b, g, r) in colors:
                pimg[y,x] = colors[(b, g, r)]
                
    cv2.imwrite(os.path.join(to_path, i),pimg)
