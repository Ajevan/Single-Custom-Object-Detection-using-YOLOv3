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

# Test

## Evaluates the model on COCO test.

$ python3 test.py --weights_path weights/yolov3.weights

# To Run the Model

$ python3 detect.py --image_folder data/samples/ (for multi-detection)

$ python3 single_detect.py --image_folder data/input/ (for single-detection)

With the single detection, it uses the coco.clss for comparing user chosen class to all predicted classes
Please look at the coco.clss file for structure of how to add classes to detect.

To upload the image, please upload to the data/input folder, same one as the command for single detect.

It will place the processed image into the output folder, located in the same folder as the single_detect.py file.


