#! /usr/bin/python3.6

import dill
import gzip
import os
import sys

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

    ftp_command = """
lftp -e \"
put -O {remote_root_dir} {root_dir_path}index.html;
put -O {remote_root_dir} {root_dir_path}math.html;
put -O {remote_root_dir} {root_dir_path}numeric.html;
put -O {remote_root_dir} {root_dir_path}programming.html;
put -O {remote_root_dir} {root_dir_path}cryptography.html;
put -O {remote_root_dir} {root_dir_path}mystyle.css;
put -O {remote_root_dir} {root_dir_path}nav_links.html;
put -O {remote_root_dir} {root_dir_path}footer_links.html;
put -O {remote_root_dir} {root_dir_path}site_viewer_counter.html;
put -O {remote_root_dir} {root_dir_path}table_footer.html;
bye\" -u {usr},{pwd} {hst_adr}""".format(
        usr=usr, pwd=pwd, hst_adr=hst_adr,
        root_dir_path=root_dir_path,
        remote_root_dir=remote_root_dir).replace("\n", "")

    # print("ftp_command:\n{}".format(ftp_command))        

    print("Execute command!")
    os.system(ftp_command)
