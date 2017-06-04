from __future__ import print_function
import boto3
import os
import ftplib

# AWS S3 Bucket name
bucket = "mousaka-images"

# FTP Credentials
ip = "ftp2.bom.gov.au"
username = "anonymous"
password = "l.a.olsson@gmail.com"
remote_directory = "/anon/gen/radar/"


index = {}
files = []

def on_file(string):
    if 'IDR714.T' in string or 'IDR713.T' in string or 'IDR71A.T' in string:
        print(string)
        if string not in index:
            files.append(string)

def lambda_handler(event, context):
    # Connecting to FTP
    s3 = boto3.client('s3')
    try:
        ftp = ftplib.FTP('ftp2.bom.gov.au')
        ftp.login()                                                                                                                                               
        ftp.cwd("/anon/gen/radar/")
        ftp.retrlines('NLST', on_file)

        for f in files:
            print(f)
            ftp.retrbinary('RETR ' + f, open(os.path.join('/tmp', f), 'wb').write)
            s3.upload_file(os.path.join('/tmp', f), bucket, f)
    except Exception as e:
        print(str(e))
