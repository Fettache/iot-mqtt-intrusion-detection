#module to preprocess the network dataset

import pandas as pd
import numpy as np
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split


names = ["frame.time_delta","frame.time_delta_displayed","frame.time_epoch","frame.time_invalid",
"frame.time_relative","eth.src","eth.dst","ip.src","ip.dst","tcp.srcport","tcp.dstport","tcp.flags",
"frame.cap_len","frame.len","frame.number","tcp.stream","tcp.analysis.initial_rtt","tcp.time_delta","tcp.len",
"tcp.window_size_value","tcp.checksum","mqtt.clientid","mqtt.clientid_len","mqtt.conack.flags","mqtt.conack.flags.reserved",
"mqtt.conack.flags.sp","mqtt.conack.val","mqtt.conflag.cleansess","mqtt.conflag.passwd","mqtt.conflag.qos","mqtt.conflag.reserved","mqtt.conflag.retain",
"mqtt.conflag.uname","mqtt.conflag.willflag", "mqtt.conflags","mqtt.dupflag","mqtt.hdrflags","mqtt.kalive","mqtt.len","mqtt.msg","mqtt.msgid","mqtt.msgtype",
"mqtt.passwd","mqtt.passwd_len","mqtt.proto_len","mqtt.protoname","mqtt.qos","mqtt.retain","mqtt.sub.qos","mqtt.suback.qos","mqtt.topic","mqtt.topic_len","mqtt.username",
"mqtt.username_len","mqtt.ver","mqtt.willmsg","mqtt.willmsg_len","mqtt.willtopic","mqtt.willtopic_len","ip.proto"]

seed=7



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
    del df['tcp.checksum'] #da rimuovere paper
    del df['mqtt.topic_len'] #da rimuovere paper
    del df['mqtt.passwd_len']
    del df['mqtt.passwd']
    del df['mqtt.clientid']
    del df['mqtt.clientid_len']
    del df['mqtt.username']
    del df['mqtt.username_len']
    return df


print("Starting process dataset")

#legitimate
df_legitimate = pd.read_csv('legitimate_1w.csv')
print("dataset uploaded")
df_legitimate.fillna(0, inplace=True)
df_legitimate['target'] = 'legitimate'
cleandata(df_legitimate)
df_legitimate = df_legitimate.head(10000000)
trainleg = df_legitimate.head(7000000)
testleg = df_legitimate.tail(3000000)
'''
df_legitimate_reduced = df_legitimate.loc[71::72].sample(frac=1,replace=True).reset_index(drop=True).head(165463)
trainleg = df_legitimate_reduced.head(115824)
testleg = df_legitimate_reduced.tail(49639)
'''
print("Shape of Legitimate: " + str(df_legitimate.shape))


#slowite
df_slowite = pd.read_csv('slowite.csv')
df_slowite.fillna(0, inplace=True)
df_slowite['target'] = 'slowite'
cleandata(df_slowite)
df_slowite_total=pd.DataFrame()
for i in range(250):
    df_slowite_total=df_slowite_total.append(df_slowite.head(8000), ignore_index=True)
#df_slowite_total=df_slowite_total.append(df_slowite.head(47000), ignore_index=True)
print("Shape of aumented SlowITe: " + str(df_slowite_total.shape))
trainslow = df_slowite_total.head(1400000)
testslow = df_slowite_total.tail(600000)
print("Train:" + str(trainslow.shape) + " Test: "+ str(testslow.shape))
#print("Shape of SlowITe: " + str(df_slowite.shape))

#malaria
df_malaria = pd.read_csv('malaria.csv')
df_malaria.fillna(0, inplace=True)
df_malaria['target'] = 'dos'
cleandata(df_malaria)
df_malaria_total=pd.DataFrame()
for i in range(15):
    df_malaria_total=df_malaria_total.append(df_malaria.head(130000), ignore_index=True)
df_malaria_total=df_malaria_total.append(df_malaria.head(50000), ignore_index=True)
print("Shape of aumented DoS: " + str(df_malaria_total.shape))
trainmalaria = df_malaria_total.head(1400000)
testmalaria = df_malaria_total.tail(600000)
print("Train:" + str(trainmalaria.shape) + " Test: "+ str(testmalaria.shape))
#print("Shape of DoS: " + str(df_malaria.shape))


#malformed
df_malformed = pd.read_csv('malformed.csv')
df_malformed.fillna(0, inplace=True)
df_malformed['target'] = 'malformed'
cleandata(df_malformed)
df_malformed_total=pd.DataFrame()
for i in range(200):
    df_malformed_total=df_malformed_total.append(df_malformed.head(10000), ignore_index=True)
print("Shape of aumented malformed: " + str(df_malformed_total.shape))
trainmalformed = df_malformed_total.head(1400000)
testmalformed = df_malformed_total.tail(600000)
print("Train:" + str(trainmalformed.shape) + " Test: "+ str(testmalformed.shape))
#print("Shape of malformed: " + str(df_malformed.shape))

#flood
df_flood = pd.read_csv('flood.csv')
df_flood.fillna(0, inplace=True)
df_flood['target'] = 'flood'
cleandata(df_flood)
df_flood_total=pd.DataFrame()
for i in range(4000):
    df_flood_total=df_flood_total.append(df_flood.head(500), ignore_index=True)
print("Shape of aumented Flood: " + str(df_flood_total.shape))
trainflood = df_flood_total.head(1400000)
testflood = df_flood_total.tail(600000)
print("Train:" + str(trainflood.shape) + " Test: "+ str(testflood.shape))
#print("Shape of Flood: " + str(df_flood.shape))

#bruteforce
df_bruteforce = pd.read_csv('bruteforce.csv')
df_bruteforce.fillna(0, inplace=True)
df_bruteforce['target'] = 'bruteforce'
cleandata(df_bruteforce)
df_bruteforce_total=pd.DataFrame()
for i in range(142):
    df_bruteforce_total=df_bruteforce_total.append(df_bruteforce.head(14000), ignore_index=True)
df_bruteforce_total=df_bruteforce_total.append(df_bruteforce.head(12000), ignore_index=True)
print("Shape of aumented bruteforce: " + str(df_bruteforce_total.shape))
trainbrute = df_bruteforce_total.head(1400000)
testbrute = df_bruteforce_total.tail(600000)
print("Train:" + str(trainbrute.shape) + " Test: "+ str(testbrute.shape))
#print("Shape of bruteforce:" + str(df_bruteforce.shape))


#70% code
df_train = pd.concat([trainleg,trainmalaria,trainmalformed,trainslow,trainflood,trainbrute])
df_train = shuffle(df_train,random_state=seed)
print(df_train)
df_train.to_csv (r'./train70_augmented_new.csv', index = False, header=True)

df_test=pd.concat([testleg, testbrute,testflood,testmalaria,testmalformed,testslow])
df_test = shuffle(df_test,random_state=seed)
print(df_test)
df_test.to_csv (r'./test30_augmented_new.csv', index = False, header=True)