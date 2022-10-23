<script>
import {saveChatMessage, subscribeToChatMessages} from "../chat/chat.js";
import {dateToString} from "../helpers/date.js";
import Loader from "../components/Loader.vue";
import LoadingContext from "../components/LoadingContext.vue";


export default {
    name: "Chat",
    components: {LoadingContext, Loader},

    
    data: () => ({
        messages: [],
        newMessage: {
            name: '',
            text: '',
        },
        messagesLoaded: false,
        unsubscribeFunction: () => {},
        
    }),
    methods: {
        
        dateToString,
        
        save() {
            
            saveChatMessage({
                ...this.newMessage,
            });
            this.newMessage.text = "";
        },
    },
    mounted() {
        
        this.unsubscribeFunction = subscribeToChatMessages(newMessages => {
            
            this.messages = newMessages;
            this.messagesLoaded = true;
        });
    },
    unmounted() {
        this.unsubscribeFunction();
    }
};
</script>

<template>
    <section>
        <h1 class="mb-3">Chateá con nosotros</h1>

        <div class="row">
            <div class="col-8">
                <h2>Sala de Chat</h2>
                <div id="messages">
                    <LoadingContext :loading="!messagesLoaded">
                        <ul>
                            <li
                                v-for="message in messages"
                                :key="message.id"
                            >
                                <b>({{ dateToString(message.created_at) }}) {{ message.name }} dijo</b>: {{ message.text }}
                            </li>
                        </ul>
                    </LoadingContext>
                  
                </div>
            </div>
            <div class="col-4">
                <h2>Enviá un mensaje</h2>
                <form
                    action="#"
                    method="post"
                    id="form-chat"
                    @submit.prevent="save"
                >
                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            class="form-control"
                            v-model="newMessage.name"
                        >
                    </div>
                    <div class="mb-3">
                        <label for="text" class="form-label">Mensaje</label>
                        <textarea
                            id="text"
                            class="form-control"
                            v-model="newMessage.text"
                        ></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
        </div>
    </section>
</template>
