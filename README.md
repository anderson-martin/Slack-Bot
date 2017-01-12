# Slack-Bot
### 1. Introduction
<a href="http://www.viima.com">Viima </a> is an interactive SaaS tool for open innovation and transparent feedback.

Durng my free time, I developed a Slack Bot for it, based on Node.js and Bokit framework.

This bot works in conjuction with REST API of the Viima's demo solution which is accessible <a href="https://demo.viima.com/test-company/tutorial-board/"> from here. </a> However, they might change this link in future, so I have added following screenshots of Viima:
.


In Viima, ideas are presented in a nice and interactive way.

![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/screenshots/viima-one.jpg)



In Viima, users can react to any idea by commenting, Liking it, etc.

![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/screenshots/viima-two.jpg)



### 2. Functionality
Bot is equipped with some real-time commands which enable Viima's users to work with it, directly from Slack. SO, they don't have to login separately to their Viima's account. I'm gonna equip each command with screenshot for clarificaiton. In theSlack channel, I have defined the BOt's user name is viima-bot, but it can be anything.



Following makes the bot to introduce himself and to instruct the user how to use it.

```
@viima-bot help 

```


![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/screenshots/slack-one.jpg)

Following command shows all available ideas (as real-time) and their corresponding codes

```
@viima-bot allideas
 
 ```


![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/screenshots/slack-two.jpg)


Following command shows a specific idea in detail. This includes author, description.

```
@viima-bot idea corresponding_code 
`
```

![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/screenshots/slack-three.jpg)



Following command shows comments (as real-time) made on an idea

```
@viima-bot comments corresponding_code 

```

![alt tag](https://github.com/anderson-martin/Slack-Bot/blob/master/screenshots/slack-four.jpg)



### 2.1 Architecture
You can look into the slack_bot.js in the root folder to see how I coonfigured it according to Viima's REST API. I have commented it for better clarification.

This bot is woorking as a stand-alone module so it's reuable and can easily be maintained. And being built based on Botkit & Node, it's fast and robost.

To run the bot, you should go to the rooot oflder and run following command:

```
 token=************ node slack_bot.js
 
```

To get a token, you have to create your bot user on Slack. More info <a href="https://api.slack.com/bot-users"> here. </a> 


### 3. Final words

This is just a Minimum Viable Product (MVP) that I developed over a weekend. So, there are many opportunities for improvement. Also, Viima admins have deliberately protected their API against POST request, that's why I developed this MVP one-way. But having the required crednetials, this bot can easily post into Viima too.

