#! /usr/bin/python2.7

import ftplib
import gzip

import cPickle as pkl

from os.path import expanduser

home = expanduser("~")

# with gzip.open("/home/haris/Documents/double_pmcl_data.pkl.gz", "rb") as fin:
with gzip.open(home+"/Documents/double_pmcl_data.pkl.gz", "rb") as fin:
    data = pkl.load(fin)

# print("data = {}".format(data))

session = ftplib.FTP('ftp.cluster005.hosting.ovh.net', data['user'], data['password'])

main_dir = "/www/img_test/"
filenames = ["img_test.js", "index.html", "style.css"]

for filename in filenames:
    with open(filename, 'rb') as fin:
        session.storbinary("STOR "+main_dir+filename, fin)

session.quit()
