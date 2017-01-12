# Slack-Bot
### 1. General Info
<a href="http://www.viima.com">Viima </a> is an interactive SaaS tool for open innovation and transparent feedback.

Durng my free time, I developed a Slack Bot for it, based on Node.js and Bokit framework.

This bot works in conjuction with REST API of the Viima's demo solution which is accessible <a href="https://demo.viima.com/test-company/tutorial-board/"> from here. </a> However, they might change this link in future, so I have added following screenshots of Viima:
.


In Viima, ideas are presented in a nice and interactive way.
![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/viima-one.jpg)



In Viima, users can react to any idea by commenting, Liking it, etc.
![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/viima-two.jpg)



### 2. Functionality
Bot is equipped with some real-time commands which enable Viima's users to work with it, directly from Slack. SO, they don't have to login separately to their Viima's account. I'm gonna equip each command with screenshot for clarificaiton. In theSlack channel, I have defined the BOt's user name is viima-bot, but it can be anything.




**_@viima-bot help_** makes the bot to introduce himself and to instruct the user how to use it.
![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/slack-one.jpg)




**_@viima-bot allideas_** shows all available ideas (as real-time) and their corresponding codes
![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/slack-two.jpg)


Following command shows a specific idea in detail. This includes author, description.

```
@viima-bot idea corresponding_code 
```


![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/slack-three.jpg)



Following command shows comments (as real-time) made on an idea
```
@viima-bot comments corresponding_code 

``` 
![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/slack-four.jpg)



### 2.1 Architecture
You can look into the slack_bot.js in the root folder to see how I coonfigured it according to Viima's REST API. 

This bot is woorking as a stand-alone module so it's reuable and can easily be maintained. And being built based on Botkit & Node, it's fast and robost.

To run the bot, you should go to the rooot oflder and run following command:

```
 token=************ node slack_bot.js
```

To get a token, you have to create you bot user on Slack. More info <a href="https://api.slack.com/bot-users"> here. </a> 






