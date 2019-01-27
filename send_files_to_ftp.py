#! /usr/bin/python3.6

import dill
import gzip
import os
import sys

from utils import folders_dict

remote_root_dir = "/www/"
root_dir_path = os.path.abspath(os.path.dirname(__file__))+"/"

from os.path import expanduser
home = expanduser("~")

if __name__ == "__main__":
    with gzip.open(home+"/Documents/double_pmcl_data.pkl.gz", "rb") as fin:
        data = dill.load(fin)

    usr = data["usr"]
    pwd = data["pwd"]
    hst_adr = data["hst_adr"]

    put_template = "put -O {remote_root_dir}{{next_folder}} {root_dir_path}{{next_folder}}{{file_name}};".format(
        remote_root_dir=remote_root_dir, root_dir_path=root_dir_path)

    def get_next_put_commands(dct):
        next_folder = dct["next_folder"]
        if next_folder != "":
            next_folder += "/"
        file_names = dct["file_names"]

        put_commands = "mkdir -p {remote_root_dir}{next_folder};".format(
            remote_root_dir=remote_root_dir,
            next_folder=next_folder)
        for file_name in file_names:
            put_commands += put_template.format(next_folder=next_folder, file_name=file_name)

        return put_commands

    put_commands_whole = ""

    put_commands_whole += get_next_put_commands(folders_dict["root_folder"])
    put_commands_whole += get_next_put_commands(folders_dict["contents"])
    # put_commands_whole += get_next_put_commands(folders_dict["startbootstrap_clean_blog_gh_pages"])

    ftp_command = "lftp -e \"{put_commands_whole}bye\" -u {usr},{pwd} {hst_adr}".format(
        put_commands_whole=put_commands_whole,
        usr=usr,
        pwd=pwd,
        hst_adr=hst_adr)        

    print("Execute command!")
    os.system(ftp_command)
