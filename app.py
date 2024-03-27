from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Flask backend is running!'

@app.route('/stitch', methods=['POST'])
def stitch_images():
    # Placeholder for image stitching logic

    # STEP 1: Get image data from request
    data = request.get_json()
    image1_data = base64.b64decode(data['image1'])
    image2_data = base64.b64decode(data['image2'])

    # STEP 2: Convert image data to OpenCV format
    image1 = cv2.imdecode(np.frombuffer(image1_data, np.uint8), cv2.IMREAD_COLOR)
    image2 = cv2.imdecode(np.frombuffer(image2_data, np.uint8), cv2.IMREAD_COLOR)

    # STEP 3: Convert Images to Grayscale
    gray1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)

    # STEP 4: Find keypoints and descriptors using SIFT
    sift = cv2.SIFT_create()
    keypoints1, descriptors1 = sift.detectAndCompute(gray1, None)
    keypoints2, descriptors2 = sift.detectAndCompute(gray2, None)

    # STEP 5: Match descriptors between the images
    matcher = cv2.BFMatcher()
    matches = matcher.knnMatch(descriptors1, descriptors2, k=2)

    # STEP 6: Apply ratio test to find good matches
    good_matches = []
    for m, n in matches:
        if m.distance < 0.75 * n.distance:
            good_matches.append(m)

    # STEP 7: Extract matched keypoints
    src_pts = np.float32([keypoints1[m.queryIdx].pt for m in good_matches]).reshape(-1, 1, 2)
    dst_pts = np.float32([keypoints2[m.trainIdx].pt for m in good_matches]).reshape(-1, 1, 2)

    # STEP 8: # Compute homography
    H,  = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
    
    # STEP 9: Warp image1 to image2 perspective
    height, width, channels = image2.shape
    warpedimage = cv2.warpPerspective(image1, H, (width, height))

    # STEP 10: Combine images
    result = cv2.addWeighted(warpedimage, 0.5, image2, 0.5, 0)

    # STEP 11: Return stitched image data as base64
    retval, buffer = cv2.imencode('.jpg', result)
    stitched_image_base64 = base64.b64encode(buffer).decode('utf-8')

    return jsonify({'stitched_image': stitched_image_base64})

if __name__ == '__main__':
    app.run(debug=True)
