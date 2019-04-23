<template>
  <div>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList" aria-setsize="auto"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="false"
      :showFile="false"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling" />
  </div>
</template>

<script>
import photo from "../../assets/robot.png"
import title_photo from "../../assets/title.png"

export default {
  name: 'app',
  data() {
    return {
      participants: [
        {
          id: 'user1',
          name: '小Q',
          imageUrl: photo
        }
      ], 
      titleImageUrl: title_photo,
      messageList: [
          { type: 'text', author: `me`, data: { text: `Say yes!` } },
          { type: 'text', author: `user1`, data: { text: `No.` } }
      ], 
      newMessagesCount: 0,
      isChatOpen: false, 
      showTypingIndicator: '', 
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true
    }
  },
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        // this.onMessageWasSent({ author: 'user1', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
    //   console.log(message)
      this.messageList = [ ...this.messageList, message ]
      this.getResult(message)
    },
    test: function(text){
        this.messageList = [ ...this.messageList, text ]
    },
    getResult: function(text){
        this.$http.post('apis/getReply', {data: text}).then(response => {
                console.log(response.data);
                var result = response.data
                this.messageList = [ ...this.messageList, { type: 'text', author: `user1`, data: { text: result } } ]
            }, response => {
                console.log("error");
        });
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    }
  }
}
</script>
