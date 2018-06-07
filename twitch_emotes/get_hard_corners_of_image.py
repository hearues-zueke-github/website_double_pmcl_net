#! /usr/bin/python3.5

import sys

import numpy as np

from PIL import Image

def get_new_image_delete_blurry(img):
    pix = np.array(img)

    alpha_channel = pix[:, :, 3]
    threshold = 128
    alpha_channel[alpha_channel>threshold] = 255
    pix[alpha_channel <= threshold] = (0, )*4

    return Image.fromarray(pix)


if __name__ == "__main__":
    file_names = ["dpmclHappy_448x448_orig.png",
                  "dpmclFail_448x448_orig.png",
                  "dpmclDoIt_448x448_orig.png"]

    for file_name in file_names:
        print("")
        print("file_name: {}".format(file_name))
        img = Image.open(file_name)
        pix = np.array(img)

        img2 = get_new_image_delete_blurry(img)
        img2.save(file_name.replace("_orig", "_modified"), "PNG")
        print("Saved the image with the size 448x448 modified")

        orig_size = "448"
        try:
            img_112x112 = get_new_image_delete_blurry(img2.resize((112, 112), Image.ANTIALIAS))
            img_112x112.save(file_name.replace("_orig", "").replace(orig_size, "112"), "PNG")
            print("Saved the image with the size 112x112")

            img_56x56 = get_new_image_delete_blurry(img2.resize((56, 56), Image.ANTIALIAS))
            img_56x56.save(file_name.replace("_orig", "").replace(orig_size, "56"), "PNG")
            print("Saved the image with the size 56x56")

            img_28x28 = get_new_image_delete_blurry(img2.resize((28, 28), Image.ANTIALIAS))
            img_28x28.save(file_name.replace("_orig", "").replace(orig_size, "28"), "PNG")
            print("Saved the image with the size 28x28")
        except:
            print("Something was going wrong!")
