import markup from "./markup.js"

class Widget {
    constructor(container) {
        this.container = container

        this.#initializeWidget()
    }

    #initializeWidget() {
        this.container.innerHTML = markup

        bindEventListeners(this.container)
    }
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

export default Widget