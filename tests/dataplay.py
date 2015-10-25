import json

j_file = open('results/test1.json')
json = json.load(j_file)


#for key in json[u'statuses'][0].keys():
#    print key, json[u'statuses'][0][key]

print json[u'statuses'][0]

# [u'contributors', u'truncated', u'text', u'is_quote_status', u'in_reply_to_status_id', u'id', u'favorite_count', u'source', u'retweeted', u'coordinates', u'entities', u'in_reply_to_screen_name', u'in_reply_to_user_id', u'retweet_count', u'id_str', u'favorited', u'retweeted_status', u'user', u'geo', u'in_reply_to_user_id_str', u'possibly_sensitive', u'lang', u'created_at', u'in_reply_to_status_id_str', u'place', u'metadata']