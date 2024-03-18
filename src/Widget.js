import Icons from "./Icons.js"

class Widget {
    constructor(container) {
        this.container = container

        this.#initializeWidget()
    }

    #initializeWidget() {
        const activator = document.createElement("div")
        activator.classList.add("relay-activator")

        const chatContainer =  document.createElement("div")
        chatContainer.classList.add("relay-chat-container")

        const button = document.createElement("div")
        button.appendChild(createSvg(Icons.mdiClose))
        button.setAttribute("role", "button")
        button.classList.add("relay-close-btn")

        button.addEventListener("click", () => {
            if (chatContainer.classList.contains("active")) {
                chatContainer.classList.remove("active")
            }
        })

        chatContainer.appendChild(button)

        activator.addEventListener("click", () => {
            if (!chatContainer.classList.contains("active")) {
                chatContainer.classList.add("active")
            }
        })

        this.container.append(activator)
        this.container.append(chatContainer)
        console.log('initialized')
    }
}

function createSvg(path, viewBox = "0 0 24 24") {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("viewBox", viewBox)
    svg.setAttribute("fill", "currentColor")

    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pathElement.setAttribute("d", path)
    svg.appendChild(pathElement);

    return svg
}

export default Widget