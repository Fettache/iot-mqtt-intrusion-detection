from sklearn.model_selection import GridSearchCV
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn import metrics
from keras.wrappers.scikit_learn import KerasClassifier
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation
from tensorflow.keras.callbacks import EarlyStopping
from keras.utils.vis_utils import plot_model
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier 
from sklearn.neural_network import MLPClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn import tree
from sklearn.externals.six import StringIO  
from sklearn.metrics import confusion_matrix
from matplotlib import pyplot as pyplot
from sklearn.metrics import roc_auc_score, roc_curve
from sklearn.metrics import plot_confusion_matrix
from warnings import simplefilter
import time
start = time.time()

#with two dataset splitted
dftrain = pd.read_csv("train70_reduced.csv") 
dftest = pd.read_csv("test30_reduced.csv")
simplefilter(action='ignore', category=FutureWarning)
seed = 7

'''
#one dataset to be splitted
df = pd.read_csv("mqttdataset.csv") 
seed = 7
class_names = df.target.unique()
df=df.astype('category')
cat_columns = df.select_dtypes(['category']).columns
df[cat_columns] = df[cat_columns].apply(lambda x: x.cat.codes)

x_columns = df.columns.drop('target')
x = df[x_columns].values
y = df['target']

print("Ready to generate train and test datasets")
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=seed)
print("x_train, y_train, x_test, y_test" + str(x_train.shape) + "" +str(y_train.shape) + "" +str(x_test.shape) + "" +str(y_test.shape))
'''

#train
#print(dftrain.loc[dftrain['target'] == 'legitimate'])
class_names = dftrain.target.unique()
dftrain=dftrain.astype('category')
cat_columns = dftrain.select_dtypes(['category']).columns
dftrain[cat_columns] = dftrain[cat_columns].apply(lambda x: x.cat.codes)
#print(dftrain.loc[125, 'target'])
x_columns = dftrain.columns.drop('target')
x_train = dftrain[x_columns].values
y_train = dftrain['target']

#test
class_names = dftest.target.unique()
dftest=dftest.astype('category')
cat_columns = dftest.select_dtypes(['category']).columns
dftest[cat_columns] = dftest[cat_columns].apply(lambda x: x.cat.codes)
x_columns = dftest.columns.drop('target')
x_test = dftest[x_columns].values
y_test = dftest['target']


print("Ready to generate train and test datasets")

#Neural network
print("Starting Random forest")
model = Sequential()
model.add(Dense(50, input_dim=x_train.shape[1], kernel_initializer='normal', activation='relu'))
model.add(Dense(30, input_dim=x_train.shape[1], kernel_initializer='normal', activation='relu'))
model.add(Dense(20, kernel_initializer='normal'))
model.add(Dense(6,activation='softmax'))
model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
monitor = EarlyStopping(monitor='val_loss', min_delta=1e-3, patience=5, verbose=1, mode='auto')
history = model.fit(x_train,y_train,validation_data=(x_test,y_test),callbacks=[monitor],verbose=2,epochs=200,batch_size=1000) 
end = time.time()
diff=end-start
print("Training time: " + str(diff))
starttest = time.time()
y_pred_nn = model.predict(x_test)
y_pred_nn = np.argmax(y_pred_nn,axis=1)
endtest =time.time()
difftest = endtest-starttest
print("Test time: " + str(difftest))

print(model.summary())


#RandomForest
print("Starting Random forest")
classifier = RandomForestClassifier(verbose=2,random_state=seed)
classifier.fit(x_train, y_train)
end = time.time()
diff=end-start
print("Training time: " + str(diff))
starttest = time.time()
y_pred_random = classifier.predict(x_test)
endtest =time.time()
difftest = endtest-starttest
print("Test time: " + str(difftest))

#Create Naive Bayes Classifier
print("Starting Naive Bayes")
gnb = GaussianNB()
gnb.fit(x_train, y_train)
end = time.time()
diff=end-start
print("Training time: " + str(diff))
starttest = time.time()
y_pred_nb = gnb.predict(x_test)
endtest =time.time()
difftest = endtest-starttest
print("Test time: " + str(difftest))

#Decision tree
print("Starting Decision tree")
clf = DecisionTreeClassifier()
clf = clf.fit(x_train,y_train)
end = time.time()
diff=end-start
print("Training time: " + str(diff))
starttest = time.time()
y_pred_dt = clf.predict(x_test)
y_pred_dt_roc = clf.predict_proba(x_test)
endtest =time.time()
difftest = endtest-starttest
print("Test time: " + str(difftest))

#Multi layer perceptron
print("Starting Multi layer perceptron")
model = MLPClassifier( max_iter=130, batch_size=1000, alpha=1e-4, activation = 'relu',solver='adam', verbose=10, tol=1e-4, random_state=seed)
model.fit(x_train, y_train)
end = time.time()
diff=end-start
print("Training time: " + str(diff))
starttest = time.time()
y_pred_mlp = model.predict(x_test)
endtest =time.time()
difftest = endtest-starttest
print("Test time: " + str(difftest))

#Gradient boost
print("Starting Gradient boost")
model = GradientBoostingClassifier(n_estimators=20, random_state=seed,verbose=2)
model.fit(x_train, y_train)
end = time.time()
diff=end-start
print("Training time: " + str(diff))
starttest = time.time()
y_pred_gradient = model.predict(x_test)
endtest =time.time()
difftest = endtest-starttest
print("Test time: " + str(difftest))


print("Decision Tree, accuracy: " + str(metrics.accuracy_score(y_test, y_pred_dt)) + " F1 score:" + str(metrics.f1_score(y_test, y_pred_dt,average='weighted')))
matrixdt = confusion_matrix(y_test,y_pred_dt)
print(matrixdt)


print("Naive Bayes, accuracy: " + str(metrics.accuracy_score(y_test, y_pred_nb)) + " F1 score:" + str(metrics.f1_score(y_test, y_pred_nb,average='weighted')))
matrixnv = confusion_matrix(y_test,y_pred_nb)
print(matrixnv)


print("Neural network, accuracy: " + str(metrics.accuracy_score(y_test, y_pred_nn)) + " F1 score:" + str(metrics.f1_score(y_test, y_pred_nn,average='weighted')))
matrixnn = confusion_matrix(y_test,y_pred_nn)
print(matrixnn)

print("MultiLayerPerceptron, accuracy: " + str(metrics.accuracy_score(y_test, y_pred_mlp)) + " F1 score:" + str(metrics.f1_score(y_test, y_pred_mlp,average='weighted')))
matrixml = confusion_matrix(y_test,y_pred_mlp)
print(matrixml)
print("Random Forest, accuracy: " + str(metrics.accuracy_score(y_test, y_pred_random)) + " F1 score:" + str(metrics.f1_score(y_test, y_pred_random,average='weighted')))
matrixrf = confusion_matrix(y_test,y_pred_random)
print(matrixrf)
print("GradienBoost, accuracy: " + str(metrics.accuracy_score(y_test, y_pred_gradient)) + " F1 score:" + str(metrics.f1_score(y_test, y_pred_gradient,average='weighted')))
matrixgb = confusion_matrix(y_test,y_pred_gradient)
print(matrixgb)
