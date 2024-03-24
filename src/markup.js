const markup = `
    <div class="relay-activator"></div>
    
    <div class="relay-chat-container">
        <div class="relay-header">
            Relay chat
            <div 
                class="relay-close-btn"
                role="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
            </div>        
        </div>
        
        <div class="relay-chat-messages">
<!--        Example-->
            <div class="relay-chat-message">
                <div class="relay-chat-message-author">
                    Some operator
                </div>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
            
            <div class="relay-chat-message client-variant">
                <div class="relay-chat-message-author">
                    You
                </div>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
        </div>
<!--    Example-->
        
        <div class="relay-chat-actions">
            <textarea name="relay-user-input" id="" rows="3"></textarea>
            <div
                class="relay-send-btn"
                role="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>send</title><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" /></svg>
            </div>
        </div>
    </div>
`

export default markup