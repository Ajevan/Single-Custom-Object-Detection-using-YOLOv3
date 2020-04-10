# Single-Custom-Object-Detection-using-YOLOv3
A single/custom object detection program written in Python and JS

Thanks to Erik Lindermonen's repo for the YOLOv3 model. The installation part of our README is similar to his.
https://github.com/eriklindernoren/PyTorch-YOLOv3

# Installation

## Clone and install requirements

$ git clone https://github.com/eriklindernoren/PyTorch-YOLOv3
$ cd PyTorch-YOLOv3/
$ sudo pip3 install -r requirements.txt

## Download pretrained weights

$ cd weights/
$ bash download_weights.sh

## Download COCO

$ cd data/
$ bash get_coco_dataset.sh

## If you do not have Node installed please do so in order to run the website:
$ sudo apt install nodejs

## Then in the folder where both the app.js file and node_module folders exist, run:
$ npm install

# Test

## If you want to test the model, this command evaluates the model on COCO test.

$ python3 test.py --weights_path weights/yolov3.weights

# To Run the Model

## To run the website on port 8080, run this command:

$ node app.js

## To run the detection python program:
$ python3 detect.py --image_folder data/samples/ (for multi-detection)

## To run the single/custom detection python program:
$ python3 single_detect.py --image_folder data/input/ (for single-detection)

## Also to edit the class you want to search for, edit the coco.clss to add a class followed by a newline character.

With the single detection, it uses the coco.clss for comparing user chosen class to all predicted classes
Please look at the coco.clss file for structure of how to add classes to detect.

To upload the image, please upload to the data/input folder, same one as the command for single detect.

It will place the processed image into the output folder, located in the same folder as the single_detect.py file.
