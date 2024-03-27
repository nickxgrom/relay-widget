import markup from "./markup.js"

const baseUrl = "http://localhost:3000",
    wsUrl = "ws://localhost:3001"

class Widget {
    constructor(container, organizationId) {
        this.container = container
        this.organizationId = organizationId

        this.#initializeWidget()
    }

    #connectToWebSocket() {
        this.wsConnection = new WebSocket(wsUrl + `?relay-token=${localStorage.getItem('relay-chat-token')}`);

        this.wsConnection.onopen = function(e) {
            console.log("[open] Connection established")
        };

        this.wsConnection.onerror = function(error) {
            console.log(`[error]`, error)
        };

        this.wsConnection.onmessage = async (event) => {
            console.log(`[message] Data received from server: ${event.data}`)

            const msg = JSON.parse(event.data ?? "")

            if (msg.type === "error") {
                if (msg.data.message === "token-expired") {
                    await createChat(this.organizationId)
                    this.#connectToWebSocket()
                }
            }

            if (msg.type === "history") {
                // TODO
            }

            if (msg.type === "message") {
                console.log(msg)
                // TODO
            }
         }
    }

    async #initializeWidget() {
        this.container.innerHTML = markup

        this.#bindEventListeners()
    }

    #bindEventListeners() {
        const chatActivator = this.container.querySelector(".relay-activator"),
            chatContainer = this.container.querySelector(".relay-chat-container"),
            closeChatBtn = this.container.querySelector('.relay-close-btn')

        chatActivator.addEventListener("click", async () => {
            if (!chatContainer.classList.contains("active")) {
                const token = localStorage.getItem('relay-chat-token')

                if (!token) {
                    const {token} = await createChat(this.organizationId)

                    localStorage.setItem("relay-chat-token", token)
                }

                this.#connectToWebSocket();
                chatContainer.classList.add("active")
            }
        })

        closeChatBtn.addEventListener("click", () => {
            if (chatContainer.classList.contains("active")) {
                chatContainer.classList.remove("active")
            }
        })
    }
}

function createChat(orgId) {
    return useFetch(`/chat/${orgId}`, {
        method: "POST",
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