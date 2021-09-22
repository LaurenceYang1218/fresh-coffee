const express = require('express');
const line = require('@line/bot-sdk');
const app = express();

const channelAccessToken = 'iXcaBCMiKYOAe3HQDw1LfqP4xb8lzTyUDF2yYWRP/Kfz+CPVfkF5fSjaYYr3L1+9pXrIaCkVaVW+ACN7HE/2TjKJPiJLkcqYEGqJBp3ANqlpxIQ4DvUuC+k9zLe62oG0qPsRdPNI5Iq1B4667jF0AgdB04t89/1O/w1cDnyilFU=';
const channelSecret = '8719bd21b50d0155ef79f2f3a7b8e18b';
const config = {
    channelAccessToken: channelAccessToken,
    channelSecret: channelSecret
}
const client = new line.Client(config);


app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});


function handleText(message, replyToken) {
    //image message
    if(message.text === '可以色色嗎'){
        return client.replyMessage(replyToken, {
            type: 'image',
            originalContentUrl: 'https://imgur.dcard.tw/D7K3R0R.jpg',
            previewImageUrl: 'https://imgur.dcard.tw/D7K3R0R.jpg'
        })
    }    
    //sticker message
    if(message.text === '好累喔'){
        return client.replyMessage(replyToken, {
            type: 'sticker',
            packageId: '6362',
            stickerId: '11087930' 
        })
    }    
    //location message
    if(message.text === '交大在哪裡？'){
        return client.replyMessage(replyToken, {
            type: 'location',
            title: '國立陽明交通大學',
            address: '新竹市東區大學路1001號',
            latitude:  24.789071,
            longitude:  120.999645
        })
    }
    //flex message
    if(message.text === '來杯咖啡'){
        return client.replyMessage(replyToken, {
            type: 'flex',
            altText: 'This is a flex message',
            contents: {
                "type": "bubble",
                "size": "mega",
                "hero": {
                    "type": "image",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                    "size": "full",
                    "offsetTop": "none",
                    "offsetBottom": "none",
                    "offsetStart": "none",
                    "offsetEnd": "none",
                    "margin": "none",
                    "position": "relative",
                    "aspectMode": "cover",
                    "action": {
                        "type": "uri",
                        "label": "action",
                        "uri": "http://linecorp.com/"
                    },
                    "flex": 1
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "Coffee Shop",
                            "size": "xxl"
                        },
                        {
                            "type": "text",
                            "text": "Please Select:",
                            "size": "lg"
                        }
                    ],
                    "position": "relative"
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "button",
                            "action": {
                                "type": "message",
                                "label": "Expresso",
                                "text": "Expresso"
                            }
                        },
                        {
                            "type": "button",
                            "action": {
                                "type": "message",
                                "label": "Americano",
                                "text": "Americano"
                            }
                        },
                        {
                            "type": "button",
                            "action": {
                                "type": "message",
                                "label": "Cappuccino",
                                "text": "Cappuccino"
                            }
                        }
                    ]
                }
            }
        })
    }
    if(message.text === 'Americano' || message.text === 'Cappuccino' || message.text === 'Expresso'){
        return client.replyMessage(replyToken, {
            type: 'flex',
            altText: 'Second flex message',
            contents: {
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": `Are you sure you want a cup of ${message.text}?`
                        }
                    ],
                    "height": "100px"
                },
                "footer": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                        {
                            "type": "button",
                            "action": {
                                "type": "message",
                                "label": "Yes",
                                "text": "Yes"
                            }
                        },
                        {
                            "type": "button",
                            "action": {
                                "type": "message",
                                "label": "No",
                                "text": "No"
                            }
                        }
                    ]
                }
            }
        })
    }

    if(message.text === 'Yes'){
        return client.replyMessage(replyToken, {
            type: 'text',
            text: 'Thanks for your order!'
        })
    }else if(message.text === 'No'){
        return client.replyMessage(replyToken, {
            type: 'text',
            text: 'Sorry, please try again!'
        })
    }
    //default
    return client.replyMessage(replyToken, {
        type: 'text',
        text: message.text
    })
}

function handleSticker(message, replyToken) {
    if(message.type === 'sticker' && message.packageId === '446' && message.stickerId === '1996'){
        return client.replyMessage(replyToken, {
            type: 'sticker',
            packageId: '446',
            stickerId: '1999'
        })
    }
}

function handleEvent(event) {
    console.log(`User ID: ${event.source.userId}`);
    switch(event.type) {
        case 'message':
            const message = event.message;
            switch(message.type) {
                case 'text': 
                    return handleText(message, event.replyToken);
                case 'sticker':
                    return handleSticker(message, event.replyToken);
                default: 
                    throw new Error(`Unknown message: ${JSON.stringify(message)}`);
            }
        default: 
            throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
}


//push api 
setTimeout(()=> {
    let userId = 'U72efa756089afd624e0cf0e58aaa7a9d';
    client.pushMessage(userId, {
        type: 'text', 
        text: '你好'
    })
}, 3000);

app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
})