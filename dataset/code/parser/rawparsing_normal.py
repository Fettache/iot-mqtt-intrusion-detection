#module to preprocess the network dataset

import pandas as pd
import numpy as np
from sklearn.utils import shuffle


names = ["frame.time_delta","frame.time_delta_displayed","frame.time_epoch","frame.time_invalid",
"frame.time_relative","eth.src","eth.dst","ip.src","ip.dst","tcp.srcport","tcp.dstport","tcp.flags",
"frame.cap_len","frame.len","frame.number","tcp.stream","tcp.analysis.initial_rtt","tcp.time_delta","tcp.len",
"tcp.window_size_value","tcp.checksum","mqtt.clientid","mqtt.clientid_len","mqtt.conack.flags","mqtt.conack.flags.reserved",
"mqtt.conack.flags.sp","mqtt.conack.val","mqtt.conflag.cleansess","mqtt.conflag.passwd","mqtt.conflag.qos","mqtt.conflag.reserved","mqtt.conflag.retain",
"mqtt.conflag.uname","mqtt.conflag.willflag", "mqtt.conflags","mqtt.dupflag","mqtt.hdrflags","mqtt.kalive","mqtt.len","mqtt.msg","mqtt.msgid","mqtt.msgtype",
"mqtt.passwd","mqtt.passwd_len","mqtt.proto_len","mqtt.protoname","mqtt.qos","mqtt.retain","mqtt.sub.qos","mqtt.suback.qos","mqtt.topic","mqtt.topic_len","mqtt.username",
"mqtt.username_len","mqtt.ver","mqtt.willmsg","mqtt.willmsg_len","mqtt.willtopic","mqtt.willtopic_len","ip.proto"]



def cleandata(df):
    del df['frame.time_invalid']
    del df['frame.time_epoch']
    del df['frame.time_relative']
    del df['frame.number']
    del df['frame.time_delta']
    del df['frame.time_delta_displayed']
    del df['frame.cap_len']
    del df['frame.len']
    del df['tcp.window_size_value']
    del df['eth.src']
    del df['eth.dst']
    del df['ip.src']
    del df['ip.dst']
    del df['ip.proto']
    del df['tcp.srcport']
    del df['tcp.dstport']
    del df['tcp.analysis.initial_rtt']
    del df['tcp.stream']
    del df['mqtt.topic']
    del df['tcp.checksum']
    del df['mqtt.topic_len'] 
    del df['mqtt.passwd_len']
    del df['mqtt.passwd']
    del df['mqtt.clientid']
    del df['mqtt.clientid_len']
    del df['mqtt.username']
    del df['mqtt.username_len']
    return df

print("Starting process dataset")
df_legitimate = pd.read_csv('legitimate_1w.csv')
df_legitimate.fillna(0, inplace=True)
df_legitimate['target'] = 'legitimate'
print("Shape of legitimate: " + str(df_legitimate.shape))
df_slowite = pd.read_csv('slowite.csv')
df_slowite.fillna(0, inplace=True)
df_slowite['target'] = 'slowite'
print("Shape of SlowITe: " + str(df_slowite.shape))
df_malaria = pd.read_csv('malaria.csv')
df_malaria.fillna(0, inplace=True)
df_malaria['target'] = 'dos'
print("Shape of DoS: " + str(df_malaria.shape))
df_malformed = pd.read_csv('malformed.csv')
df_malformed.fillna(0, inplace=True)
df_malformed['target'] = 'malformed'
print("Shape of malformed: " + str(df_malaria.shape))
df_flood = pd.read_csv('flood.csv')
df_flood.fillna(0, inplace=True)
df_flood['target'] = 'flood'
print("Shape of Flood: " + str(df_flood.shape))
df_bruteforce = pd.read_csv('bruteforce.csv')
df_bruteforce.fillna(0, inplace=True)
df_bruteforce['target'] = 'bruteforce'
print("Shape of bruteforce:" + str(df_bruteforce.shape))

print("Starting concatenate dataset")
df = pd.concat([df_legitimate,df_slowite,df_malaria,df_malformed,df_flood,df_bruteforce], ignore_index=True)
df = shuffle(df,random_state=10)
df = cleandata(df)
df.to_csv (r'./mqttdataset.csv', index = False, header=True)


