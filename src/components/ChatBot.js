import React from "react";

import ReactWebChat, { createDirectLine } from 'botframework-webchat';

import Header from './Header';

class ChatBot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            conversationId: null,
            styleOptions: {
                bubbleBackground: '#ffdc20',
                bubbleFromUserBackground: 'Black',
                bubbleFromUserTextColor: 'White',
                bubbleTextColor: 'Black',
                bubbleBorderColor: 'black',
                bubbleBorderRadius: '0px 10px 10px 10px',
                bubbleFromUserBorderRadius: '10px 0px 10px 10px',
                bubbleBorderStyle: 'solid',
                bubbleBorderWidth: 1,
                subtle: 'grey',

                // botAvatarImage: process.env.REACT_APP_PUBLIC_URL + '/elektra.png',
                //Avatar
                avatarSize: 50,
                botAvatarImage: 'https://i.ibb.co/02q2KH3/elektra.png',
                botAvatarBackgroundColor: '#ffdc20',
                userAvatarImage: 'https://i.ibb.co/KNfM1Dp/social.png',
                userAvatarBackgroundColor: 'white',
                backgroundColor: '#ffee96',
                paddingRegular: 20,
                //fonts
                fontSizeSmall: '100%',


                //text input
                hideUploadButton: true,
                microphoneButtonColorOnDictate: '#F33',
                sendBoxBackground: 'White',
                sendBoxButtonColor: 'red', // defaults to subtle
                sendBoxButtonColorOnDisabled: 'gray',
                sendBoxButtonColorOnFocus: '#333',
                sendBoxButtonColorOnHover: '#333',
                sendBoxDisabledTextColor: undefined, // defaults to subtle
                sendBoxHeight: 40,
                sendBoxMaxHeight: 200,
                sendBoxTextColor: 'Black',
                sendBoxBorderBottom: 'solid 30px black',
                sendBoxBorderLeft: 'solid 30px black',
                sendBoxBorderRight: 'solid 30px black',
                sendBoxBorderTop: 'solid 30px black',
            }
        };
    }


    async fetchToken() {
        console.log('process.env.PUBLIC_URL :>> ', process.env);

        const res = await fetch("https://directline.botframework.com/v3/directline/tokens/generate/",
            {
                method: 'POST', headers: new Headers({
                    'Authorization': 'Bearer  ' + process.env.REACT_APP_SECRET,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
            });
        const resJson = await res.json();
        this.setState({
            token: resJson.token,
            conversationId: resJson.conversationId
        });
    }

    closeBotChat(botConnection) {

        botConnection.postActivity({
            from: { id: '<user>' },
            value: "chat" + this.conversationId + " closed", //send whatever information you need about the conversation here
            type: 'event',
            name: "ConversationUpdate"
        })
            .subscribe(id => console.log("closed" + id)) // this will likely not be shown unless the botchat is in a modal within the page somewhere
    }
    componentDidMount() {
        this.fetchToken();
    }



    render() {
        const botConnection = createDirectLine({ token: this.state.token });


        return [
            <Header />,
            <ReactWebChat directLine={botConnection} styleOptions={this.state.styleOptions} />
        ]
    }

}
export default ChatBot;



