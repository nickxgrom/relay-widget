import markup from "./markup.js"

const baseUrl = "http://localhost:3000",
    wsUrl = ""

class Widget {
    constructor(container, organizationId) {
        this.container = container
        this.organizationId = organizationId

        this.#initializeWidget()
    }

    #initializeWidget() {
        const cookies = document.cookie.split(';');
        const relayChatToken = cookies.find((item) => item.trim().startsWith('relay-token='));

        if (relayChatToken) {
            const tokenValue = relayChatToken.split('=')[1];
            console.log(tokenValue);
        } else {
            createChat(this.organizationId)
        }

        this.container.innerHTML = markup

        bindEventListeners(this.container)
    }
}

function createChat(orgId) {
    useFetch(`/chat/${orgId}`, {
        method: "POST",
    }).then(token => {
        console.log(token)
    })
}

function bindEventListeners(container) {
    const chatActivator = container.querySelector(".relay-activator"),
        chatContainer = container.querySelector(".relay-chat-container"),
        closeChatBtn = container.querySelector('.relay-close-btn')

    chatActivator.addEventListener("click", () => {
        if (!chatContainer.classList.contains("active")) {
            chatContainer.classList.add("active")
        }
    })

    closeChatBtn.addEventListener("click", () => {
        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active")
        }
    })
}

function useFetch(url, options) {
    return fetch(baseUrl + url, {
        method: options?.method ?? "GET",
        body: JSON.stringify(options.body ?? {}),
        credentials: "include"
    }).then(res => {
        return res.json()
    })
}

export default Widget