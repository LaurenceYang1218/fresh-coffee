const express = require('express');
const line = require('@line/bot-sdk');
const app = express();


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
    //location message
    if(message.text === '門市地址'){
        return client.replyMessage(replyToken, {
            type: 'location',
            title: '國立陽明交通大學',
            address: '新竹市東區大學路1001號',
            latitude:  24.789071,
            longitude:  120.999645
        })
    }
    //flex message
    if(message.text === '菜單查詢'){
        return client.replyMessage(replyToken, {
            type: 'flex',
            altText: 'menu',
            contents: {
                "type": "bubble",
                "hero": {
                  "type": "image",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                  "size": "full",
                  "aspectRatio": "20:13",
                  "aspectMode": "cover",
                  "action": {
                    "type": "uri",
                    "uri": "http://linecorp.com/"
                  }
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "FRESH Cafe",
                      "weight": "bold",
                      "size": "xl"
                    },
                    {
                      "type": "text",
                      "text": "請選擇您需要的咖啡："
                    },
                    {
                      "type": "box",
                      "layout": "baseline",
                      "margin": "md",
                      "contents": [
                        {
                          "type": "icon",
                          "size": "sm",
                          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                        },
                        {
                          "type": "icon",
                          "size": "sm",
                          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                        },
                        {
                          "type": "icon",
                          "size": "sm",
                          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                        },
                        {
                          "type": "icon",
                          "size": "sm",
                          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                        },
                        {
                          "type": "icon",
                          "size": "sm",
                          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                        },
                        {
                          "type": "text",
                          "text": "4.0",
                          "size": "sm",
                          "color": "#999999",
                          "margin": "md",
                          "flex": 0
                        }
                      ]
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "margin": "lg",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "baseline",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "text",
                              "text": "Place",
                              "color": "#aaaaaa",
                              "size": "sm",
                              "flex": 1
                            },
                            {
                              "type": "text",
                              "text": "新竹市東區大學路1001號",
                              "wrap": true,
                              "color": "#666666",
                              "size": "sm",
                              "flex": 5
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "baseline",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "text",
                              "text": "Time",
                              "color": "#aaaaaa",
                              "size": "sm",
                              "flex": 1
                            },
                            {
                              "type": "text",
                              "text": "10:00 - 21:00",
                              "wrap": true,
                              "color": "#666666",
                              "size": "sm",
                              "flex": 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                "footer": {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "button",
                      "height": "sm",
                      "action": {
                        "type": "postback",
                        "label": "濃縮咖啡",
                        "data": "type=coffee&order=espresso",
                        "displayText": "濃縮咖啡"
                      }
                    },
                    {
                      "type": "button",
                      "height": "sm",
                      "action": {
                        "type": "postback",
                        "label": "美式咖啡",
                        "data": "type=coffee&order=americano",
                        "displayText": "美式咖啡"
                      }
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "卡布奇諾",
                        "data": "type=coffee&order=cappuccino",
                        "displayText": "卡布奇諾"
                      },
                      "height": "sm"
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "拿鐵",
                        "data": "type=coffee&order=latte",
                        "displayText": "拿鐵"
                      },
                      "height": "sm"
                    }
                  ],
                  "flex": 0
                }
            }
        });
    }
    //default
    return client.replyMessage(replyToken, {
        type: 'text',
        text: message.text
    })
}
let coffee, sugar, ice;
function handlePostback(postback, replytoken){
    let params = new URLSearchParams(postback.data);
    let data = Object.fromEntries(params);
    console.log(data);
    if(data.type === "coffee"){
        if(data.order === "espresso"){
            coffee = "濃縮咖啡";
            return client.replyMessage(replytoken, {
                type: 'flex',
                altText: 'early-confirm',
                contents: {
                    "type": "bubble",
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": `您確定要一杯${coffee}？`,
                          "margin": "md"
                        },
                        {
                          "type": "button",
                          "action": {
                            "type": "postback",
                            "label": "是",
                            "data": "type=confirm&confirm=yes",
                            "displayText": "是"
                          },
                          "margin": "md"
                        },
                        {
                          "type": "button",
                          "action": {
                            "type": "postback",
                            "label": "否",
                            "data": "type=confirm&confirm=no",
                            "displayText": "否"
                          }
                        }
                      ]
                    }
                  }
            })
        }else if(data.order === "americano"){
            coffee = "美式咖啡";
        }else if(data.order === "cappuccino"){
            coffee = "卡布奇諾";
        }else if(data.order === "latte"){
            coffee = "拿鐵";
        }
        return client.replyMessage(replytoken, {
            type: 'flex',
            altText: 'sugar',
            contents: {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "請問您需要的甜度是？",
                      "margin": "md"
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "全糖",
                        "data": "type=sugar&sugar=full",
                        "displayText": "全糖"
                      },
                      "margin": "md"
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "少糖",
                        "data": "type=sugar&sugar=more"
                      }
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "半糖",
                        "data": "type=sugar&sugar=half",
                        "displayText": "半糖"
                      }
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "微糖",
                        "data": "type=sugar&sugar=less",
                        "displayText": "微糖"
                      }
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "無糖",
                        "data": "type=sugar&sugar=empty",
                        "displayText": "無糖"
                      }
                    }
                  ]
                }
            }
        })
    }else if(data.type === "sugar"){
        if(data.sugar === 'full'){
            sugar = "全糖";
        }else if(data.sugar === 'more'){
            sugar = "少糖";
        }else if(data.sugar === 'half'){
            sugar = "半糖";
        }else if(data.sugar === 'less'){
            sugar = "微糖";
        }else if(data.sugar === 'empty'){
            sugar = "無糖";
        }
        return client.replyMessage(replytoken, {
            type: 'flex',
            altText: 'ice',
            contents: {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "請問您需要的冰量？",
                      "margin": "md"
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "正常",
                        "data": "type=ice&ice=normal",
                        "displayText": "正常"
                      },
                      "margin": "md"
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "少冰",
                        "data": "type=ice&ice=less"
                      }
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "去冰",
                        "data": "type=ice&ice=empty",
                        "displayText": "去冰"
                      }
                    }
                  ]
                }
            }
        })
    }else if(data.type === "ice"){
        if(data.ice === 'normal'){
            ice = "正常";
        }else if(data.ice === 'less'){
            ice = "少冰";
        }else if(data.ice === 'empty'){
            ice = "去冰";
        }
        return client.replyMessage(replytoken, {
            type: 'flex',
            altText: 'confirm',
            contents: {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": `您確定要一杯${coffee}, ${sugar}, ${ice}？`,
                      "margin": "md",
                      "size": "sm"
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "是",
                        "data": "type=confirm&confirm=yes",
                        "displayText": "是"
                      },
                      "margin": "md"
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "否",
                        "data": "type=confirm&confirm=no",
                        "displayText": "否"
                      }
                    }
                  ]
                }
            }
        })
    }else if(data.type === "confirm"){
        if(data.confirm === "yes"){
            return client.replyMessage(replytoken, {
                type: 'text',
                text: "謝謝您的訂購，歡迎再次光臨！"
            })
        }else if(data.confirm === "no"){
            return client.replyMessage(replytoken, {
                type: 'text',
                text: "很抱歉，請再試一次"
            })
        }
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
            
                default: 
                    throw new Error(`Unknown message: ${JSON.stringify(message)}`);
            }    
        case 'postback':
            const postback = event.postback;
            //console.log("handle postback");
            return handlePostback(postback, event.replyToken);
        default: 
            throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
}

//push api 
setTimeout(()=> {
    client.pushMessage(userId, {
        type: 'text', 
        text: "歡迎光臨FRESH Cafe"
    })
}, 3000);

app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
})