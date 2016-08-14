#!/usr/bin/env python
# -*- coding:utf-8 -*-

# Tweepyライブラリをインポート
import tweepy
import json

# 各種キーをセット
CONSUMER_KEY = 'aGA7n6dx5LUOp5809D0SzYwV4'
CONSUMER_SECRET = '7XjOBwzUuswPSAx4XyW1jGMmqYMyjoLilqpd41RLGj3UrBXorg'
auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
ACCESS_TOKEN = '1656187634-FuFad4Aq4JJqS5KHhn71EBgKSOD3ejAcGECX2pF'
ACCESS_SECRET = 'yD6J7nxHxzIOTd21ijhDKtA7CQf42KmJB8AInneRsCXJW'
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

#APIインスタンスを作成
api = tweepy.API(auth)

# これだけで、Twitter APIをPythonから操作するための準備は完了。
# print('Done!')

# print api.home_timeline()[0].text
# followrs = tweepy.Cursor(api.followers_ids, screen_name="AbemaTV").pages() 
# followrs = tweepy.Cursor(api.followers, screen_name="kafafafafae812").pages() 
followrs = api.followers_ids("kafafafafae812")
# followrs = api.followers_ids("YAMA414")
ids = []
i = 0
print followrs
for f in followrs:
    ids.append(f)
    i+=1
    if i > 20:
        break

users = api.lookup_users(user_ids=ids)
users_name =[]
users_name.append("kafafafafae812")
for u in users:
    # print u.screen_name
    users_name.append(u.screen_name)

favorites= api.favorites(screen_name="kafafafafae812")
# favorites= api.favorites(screen_name="sugaku_net") ;
favo=[]
i =0 
for f in favorites:
    print "########################################################"
    print f.author.screen_name
    favo.append(f.author.screen_name)
    i+=1
    if i > 20:
        break


# data={} 
# data[:nodes] ={}
# privios = users_name[0]
# for u in users_name:
#     data['nodes'][u] = {'color':'red','shape':'dot','label':u}
#
# data['edges'] = {users_name[0]:{users_name[2]:{},users_name[3]:{} }}


# JSONファイル書き込み
# with open('users.json',  'w') as f:
#     json.dump(users_name,f,sort_keys=True,indent=4)
#
# with open('favo.json',  'w') as f:
#     json.dump(favo,f,sort_keys=True,indent=4)
#
# dict = {"hello": "日本語"}
text = json.dumps(users_name,  sort_keys=True,  ensure_ascii=False,  indent=2)
with open("users.json",  "w") as fh:
        fh.write(text.encode("utf-8"))

text = json.dumps(favo,  sort_keys=True,  ensure_ascii=False,  indent=2)
with open("favo.json",  "w") as fh:
        fh.write(text.encode("utf-8"))

# print len(ids)

# api.update_status("Sample")   # つぶやき
