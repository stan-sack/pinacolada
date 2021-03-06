import cv2
import numpy as np


def draw_flow(img, flow, step=8):
    h, w = img.shape[:2]
    y, x = np.mgrid[step/2:h:step, step/2:w:step].reshape(2,-1).astype(int)
    fx, fy = flow[y,x].T
    #print(len(fx))
    #print(512/16, 32*32)
    #for x in range(32):
    #    for y in range(32):
    #        if fx[y + x * 32] > 0.001:
    #            print fx[y + x * 32],
    #        else:
    #            print '0',
    #    print()
    lines = np.vstack([x, y, x+fx, y+fy]).T.reshape(-1, 2, 2)
    lines = np.int32(lines + 0.5)
    vis = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
    cv2.polylines(vis, lines, 0, (0, 255, 0))
    for (x1, y1), (x2, y2) in lines:
        cv2.circle(vis, (x1, y1), 1, (0, 255, 0), -1)
    return vis

def warp_flow(img, flow):
    h, w = flow.shape[:2]
    flow = -flow
    flow[:,:,0] += np.arange(w)
    flow[:,:,1] += np.arange(h)[:,np.newaxis]
    res = cv2.remap(img, flow, None, cv2.INTER_LINEAR)
    return res

# Create list of names here from my1.bmp up to my20.bmp

list_names = []

mins = ['00', '06', '12', '18', '24', '30', '36', '42', '48', '54']

#mins.reverse()
for h in range(0, 10):
    for m in mins:
        list_names.append('processed/IDR714.T.201706090' + str(h ) + m + '.png')

print(list_names)


# Read in the first frame
frame1 = cv2.imread(list_names[0])
prvs = cv2.cvtColor(frame1,cv2.COLOR_BGR2GRAY)
print(prvs.shape)
print(prvs.size)
# Set counter to read the second frame at the start
counter = 1

cur_glitch = prvs.copy()

prediction = None

# Until we reach the end of the list...
while counter < len(list_names):
    # Read the next frame in

    print(list_names[counter])

    frame2 = cv2.imread(list_names[counter])
    next =  cv2.cvtColor(frame2,cv2.COLOR_BGR2GRAY)
    #print(next.shape)
    #print(next.size)
    #print(next.channels)
    #cv2.imshow('Orig', next)

    

    # Calculate optical flow between the two frames
    flow = cv2.calcOpticalFlowFarneback(prvs, next, 0.5, 3, 15, 3, 5, 1.2, 0)
    
    cv2.imshow('Flow', draw_flow(next, flow))

    if prediction != None:
        cv2.imshow('Predicted', prediction)
        cv2.imshow('Diff', cv2.subtract(next,prediction))

    prediction = warp_flow(next, flow)

#    horz = cv2.normalize(flow[...,0], None, 0, 255, cv2.NORM_MINMAX)     
#    vert = cv2.normalize(flow[...,1], None, 0, 255, cv2.NORM_MINMAX)
#    horz = horz.astype('uint8')
#    vert = vert.astype('uint8')

    # Show the components as images
#    cv2.imshow('Horizontal Component', horz)
#    cv2.imshow('Vertical Component', vert)

    # Change - Make next frame previous frame
    prvs = next.copy()

    # If we get to the end of the list, simply wait indefinitely
    # for the user to push something
#    if counter == len(list_names)-1:
#        k = cv2.waitKey(0) & 0xff
#    else: # Else, wait for 1 second for a key
    cv2.waitKey(100) & 0xff

    #if k == 27:
    #    break

    # Increment counter to go to next frame
    counter += 1

print('done')
cv2.destroyAllWindows()
