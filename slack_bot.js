if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}
var Botkit = require('./lib/Botkit.js');
var os = require('os');
var controller = Botkit.slackbot({
    debug: true
, });
// connect the bot to a stream of messages
var bot = controller.spawn({
    token: process.env.token
}).startRTM();
var request = require('request');
// greet bot
controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function (bot, message) {
    bot.api.reactions.add({
        timestamp: message.ts
        , channel: message.channel
        , name: 'robot_face'
    , }, function (err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });
    controller.storage.users.get(message.user, function (err, user) {
        if (user && user.name) {
            var reply = {
                'username': bot.identity.name
                , 'text': 'Hello ' + user.name + '!!'
                , 'icon_url': 'https://app.viima.com/static/media/logos/viima_logo_black.png'
            }
            bot.reply(message, reply);
        }
        else {
            var reply = {
                'username': bot.identity.name
                , 'text': 'Hello '
                , 'icon_url': 'https://app.viima.com/static/media/logos/viima_logo_black.png'
            }
            bot.reply(message, reply);
        }
    });
});
// ask bot to introduce himself
controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'], 'direct_message,direct_mention,mention', function (bot, message) {
    var hostname = os.hostname();
    var uptime = formatUptime(process.uptime());
    var reply = {
        'username': bot.identity.name
        , 'text': ':robot_face: I am a bot named <@' + bot.identity.name + '>. I have been running for ' + uptime + ' on ' + hostname + '.'
        , 'icon_url': 'https://app.viima.com/static/media/logos/viima_logo_black.png'
    }
    bot.reply(message, reply);
});
// getting help by mentioning the bot

controller.hears(['help'], 'direct_mention,mention', function (bot, message) {
    var hostname = os.hostname();
    var uptime = formatUptime(process.uptime());
                var reply_with_attachments = {
                    'username': bot.identity.name
                    , 'text': 'My name is ' + bot.identity.name + '. Im here to help you to use Viima app on Slack. Following commands are available at the moment: '
                    , 'attachments': [
                        {
                            "color": "#008000"
                            , "title": 'To see all ideas'
                            , "text": '@' + bot.identity.name + ' allideas \n Above command gives you list of all available ideas and their corresponding codes'
      },                         {
                            "color": "#DEB887"
                            , "title": 'To see an idea'
                            , "text": '@' + bot.identity.name + ' idea corresponding_code \n Above command shows you an idea in detail. '
      },                         {
                            "color": "#0000ff"
                            , "title": 'To see comments of an idea'
                            , "text": '@' + bot.identity.name + ' comments corresponding_code \n Above command shows you all comments made on a specific idea. '
      }
    ]
                    , 'icon_url': 'https://app.viima.com/static/media/logos/viima_logo_black.png' 
                }
                bot.reply(message, reply_with_attachments);
});

// getting help by messaging directly the bot

controller.hears(['help'], 'direct_message', function (bot, message) {
    var hostname = os.hostname();
    var uptime = formatUptime(process.uptime());
                var reply_with_attachments = {
                    'username': bot.identity.name
                    , 'text': 'My name is ' + bot.identity.name + '. Im here to help you to use Viima app on Slack. Following commands are available at the moment: '
                    , 'attachments': [
                        {
                            "color": "#008000"
                            , "title": 'To see all ideas'
                            , "text": ' allideas \n Above command gives you list of all available ideas and their corresponding codes'
      },                         {
                            "color": "#DEB887"
                            , "title": 'To see an idea'
                            , "text": ' idea corresponding_code \n Above command shows you an idea in detail. '
      },                         {
                            "color": "#0000ff"
                            , "title": 'To see comments of an idea'
                            , "text": ' comments corresponding_code \n Above command shows you all comments made on a specific idea. '
      }
    ]
                    , 'icon_url': 'https://app.viima.com/static/media/logos/viima_logo_black.png' 
                }
                bot.reply(message, reply_with_attachments);
});
// showing an idea
controller.hears(['idea (.*)'], 'direct_message,direct_mention,mention', function (bot, message) {
    var idea = message.match[1];
    var getOneIdeaOptions = {
        url: 'https://demo.viima.com/api/customers/289/items/' + idea
        , method: 'GET'
        , json: {}
    };
    controller.storage.users.get(message.user, function (err, user) {
        if (!user) {
            user = {
                id: message.user
            , };
        }
        request(getOneIdeaOptions, function (err, HTTPresponse, responseBody) {
            var data;
            if (HTTPresponse.statusCode === 200 && !err) {
                var reply_with_attachments = {
                    'username': bot.identity.name
                    , 'attachments': [
                        {
                            "color": "#0000FF"
                            , "author_name": responseBody.fullname
                            , "author_icon": responseBody.profile_picture_url
                            , "title": responseBody.name
                            , "title_link": "https://demo.viima.com/test-company/tutorial-board/?activeItem=" + responseBody.id + '&tab=comments'
                            , "text": responseBody.description
                            , "fields": [
                                {
                                    "title": "Priority"
                                    , "value": "Average"
                                    , "short": false
                }
            ]
                            , "footer": "Supported by Viima"
                            , "footer_icon": "https://app.viima.com/static/media/logos/viima_logo_black.png"
      }
    ]
                    , 'icon_url': 'https://app.viima.com/static/media/logos/viima_logo_black.png' // changed to viima icon
                }
                bot.reply(message, reply_with_attachments);
            }
            else {
                console.log('this is error ' + err)
            }
        });
    });
});
// showing comments of an idea
controller.hears(['comments (.*)'], 'direct_message,direct_mention,mention', function (bot, message) {
    var idea = message.match[1];
    var getCommentsOptions = {
        url: 'https://demo.viima.com/api/customers/289/items/' + idea + '/comments'
        , method: 'GET'
        , json: {}
    };
    controller.storage.users.get(message.user, function (err, user) {
        if (!user) {
            user = {
                id: message.user
            , };
        }
        request(getCommentsOptions, function (err, HTTPresponse, responseBody) {
            var data;
            if (HTTPresponse.statusCode === 200 && !err) {
                var i;
                var allAttachments = [];
                for (i = 0; i < responseBody.length; i++) {
                    var eachComment = {};
                    eachComment.text = responseBody[i].content;
                    eachComment.author_name = responseBody[i].fullname;
                    eachComment.color = "good";
                    eachComment.author_icon = responseBody[i].profile_picture_url;
                    allAttachments.push(eachComment);
                }
                var reply_with_attachments = {
                    'username': bot.identity.name
                    , "text": 'Spice up the conversation: \n https://demo.viima.com/test-company/tutorial-board/?activeItem=' + responseBody[0].item + '&tab=comments'
                    , 'attachments': allAttachments
                    , 'icon_url': 'https://app.viima.com/static/media/logos/viima_logo_black.png' // changed to viima icon
                }
                bot.reply(message, reply_with_attachments);
            }
            else {
                console.log('this is error ' + err)
            }
        });
    });
});
//showing all available ideas
controller.hears(['allideas'], 'direct_message,direct_mention,mention', function (bot, message) {
    var showAllIdeasOptions = {
        url: 'https://demo.viima.com/api/customers/289/items/'
        , method: 'GET'
        , json: {}
    };
    controller.storage.users.get(message.user, function (err, user) {
        if (!user) {
            user = {
                id: message.user
            , };
        }
        request(showAllIdeasOptions, function (err, HTTPresponse, responseBody) {
            var data;
            if (HTTPresponse.statusCode === 200 && !err) {
                var i;
                var allAttachments = [];
                console.log('this is what i recieved as respoonse: ' + responseBody);
                for (i = 0; i < responseBody.length; i++) {
                    var eachIdea = {};
                    eachIdea.color = '#FFA500';
                    eachIdea.text = 'Corresponding code: ' + responseBody[i].id;
                    eachIdea.title = responseBody[i].name;
                    eachIdea.title_link = "https://demo.viima.com/test-company/tutorial-board/?activeItem=" + responseBody[i].id + '&tab=comments';
                    allAttachments.push(eachIdea);
                }
                var reply_with_attachments = {
                    'username': bot.identity.name
                    , "text": 'Spice up the conversation: \n https://demo.viima.com/test-company/tutorial-board/'
                    , 'attachments': allAttachments
                    , 'icon_url': 'https://app.viima.com/static/media/logos/viima_logo_black.png' // changed to viima icon
                }
                bot.reply(message, reply_with_attachments);
            }
            else {
                console.log('this is error ' + err)
            }
        });
    });
});

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }
    uptime = uptime.toFixed() + ' ' + unit;
    return uptime;
}