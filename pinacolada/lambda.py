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
    global index, files
    # 714 -> 64km, 713 -> 128km etc. etc.
    if any(substr in string for substr in ['IDR714.T', 'IDR713.T', 'IDR712.T', 'IDR712.T']):
        print(string)
        if string not in index:
            print('adding ' + string)
            files.append(string)

def lambda_handler(event, context):
    global index, files
    # Connecting to FTP
    s3 = boto3.client('s3')

    s3_res = boto3.resource('s3')
    my_bucket = s3_res.Bucket(bucket)
    for file in my_bucket.objects.all():
        index[file.key] = file.key

    try:
        ftp = ftplib.FTP('ftp2.bom.gov.au')
        ftp.login()
        ftp.cwd("/anon/gen/radar/")
        ftp.retrlines('NLST', on_file)

        for f in files:
            print('downloading ' + f)
            try:
                ftp.retrbinary('RETR ' + f, open(os.path.join('/tmp', f), 'wb').write)
                s3.upload_file(os.path.join('/tmp', f), bucket, f)
            except Exception as e2:
                print('Failed downloading ' + f + ':' + str(e2))
    except Exception as e:
        print(str(e))
