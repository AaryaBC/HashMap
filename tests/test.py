from twython import Twython
from time import sleep
import json
from variables import twitterInfo

current = 5

twitter = Twython(twitterInfo['twitterConsumer_key'], twitterInfo['twitterConsumer_secret'],
                 twitterInfo['twitterAccess_token_key'], twitterInfo['twitterAccess_token_secret'])

tweets = 100
while (tweets > 0):
    t_json = twitter.search(q='%23blacklivesmatter')
    try:
        tweets = t_json[u'search_metadata'][u'count']
        filename = 'results/test%s.json' % (current)
        t_file = open(filename, 'w')
        json.dump(t_json, t_file)
        current += 1
    except KeyError:
        print "FAILED!"
        break
    sleep(30)