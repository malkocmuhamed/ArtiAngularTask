# ArtiAngularTask

- Development environment used: Visual Studio Code
- Node version used: v20.9.0
- Package manager - npm version used: 10.1.0
- Angular version used: 17.2.0

Setup instructions
  - Clone the repository: 
      git clone https://github.com/malkocmuhamed/ArtiAngularTask.git
      or Open with Github desktop
      or download Zip
  - Run following command in the project root to install packages:
      npm install
  - If not, Angular CLI needs to be installed. Command for installing:
      npm install -g @angular/cli
  - Run the development server:
      ng serve or npm start
  - After running, the application will be available at http://localhost:4200

--------------

Suggestion for a real-time implementation to handle chat responses 

1. What approach you'd use (WebSocket, SSE, long polling, etc.)?
2. Why did you choose it?

  The best approach I would use are WebSockets. Websockets provide the performance, flexibility, and bi-directional communication that modern chat interfaces require. Unlike long polling or SSE, WebSockets are purpose-built for dynamic, interactive applications, and they integrate cleanly with Angular’s architecture.
Why I didn't choose Long polling or SSE? 
  Long polling it's simple to implement, but it's also inefficient. Every message exchange incurs the cost of opening and closing a new HTTP request. This approach doesn't scale well and introduces latency.
  SSE provides a persistent connection from the server to the client, allowing the server to push messages as they arrive. It's more efficient than long polling for downstream-only communication. However, it's strictly one-way: the client can't push messages through the same channel. For a chat application, where messages need to flow both ways, SSE falls short.
  WebSockets are built specifically for full-duplex, low-latency communication over a single persistent connection. Once the handshake is complete, both the client and server can send data to each other independently at any time. This is ideal for a chat system where both users and the chatbot need to exchange messages in real time, which is the case in this chatbot app.
  The benefits I get with WebSockets include:
    - True two-way communication
    - Minimal latency
    - A single persistent connection per client 
    - Scalability 

3. Any libraries/tools you'd consider using in Angular?

  When I decided to add real-time capabilities to my Angular chatbot application, the WebSocket protocol was the clear choice for transport. However, working directly with raw WebSockets requires a lot of handling of connection management, reconnections, message formatting, and fallbacks.
  To solve these challenges, I chose Socket.IO, a library that builds on top of WebSockets and abstracts many of the implementation complexities. It provided the stability, structure, and developer experience I needed to confidently implement reliable two-way messaging between my client and server.
  Socket.IO uses a simple event-driven model. I can emit and listen for named events like 'chatMessage', 'userTyping', or 'botResponse' instead of parsing raw messages. This aligns well with Angular’s component and service architecture, making the codebase easier to read, maintain, and extend.
Socket.IO works seamlessly with Angular through the community-supported ngx-socket-io library. This wrapper provides a reactive interface using RxJS, which aligns naturally with Angular’s design philosophy.
Using ngx-socket-io, I can:
    - Inject the socket as a service
    - Subscribe to socket events using observables
    - Automatically unsubscribe on component destruction
    - Structure real-time code in a way that’s testable and modular

5. What would you improve with more time?

   Right now, chatbot replies are simulated using static logic or keyword matching. I would replace this with actual natural language processing by integrating a service like OpenAI, LangChain, or a local LLM.
This would allow the chatbot to generate intelligent, context-aware responses and create a more human-like conversational experience.

With more time, I would implement a real backend with the following features:
    - Secure user authentication and session management
    - API endpoints for storing chatbot configurations and uploaded knowledge base files
    - Persistent chat history in a database (e.g. MongoDB or PostgreSQL)
    - Integration with real-time WebSocket servers for live messaging

The app currently supports one chatbot configuration at a time. With more time, I would expand support for:
    - Managing multiple chatbots under a single account
    - Assigning different knowledge bases per chatbot
    - Creating unique bot personalities with switchable profiles
    - Enabling real-time collaboration between users and bots in separate rooms (using Socket.IO namespaces and rooms)

The current implementation allows uploading and listing text files. I would improve this by:
    - Supporting more file types (e.g., Markdown, CSV)
    - Previewing file content directly in the UI

To improve the chat experience, I would add:
    - Typing indicators ("Bot is typing...")
    - Message status (delivered, read)
    - Date separators and groupings in the chat history
    - Voice input or speech synthesis

With more time, my focus would be on turning this chatbot application from a solid prototype into a scalable, secure, intelligent, and polished platform that delivers real value to users. I would enhance both technical foundations and user-facing features to ensure performance, flexibility, and a world-class user experience.

--------------

Features that are currently implemented that are not listed in assignment requirements: 

  Optional features: 
    - Responsive mobile friendly layout
    - Chatbot config and uploaded files data stored in local storage
    - Angular material used for styling
  
  Not optional - not required - but seemed preferable features to implement
   - Update chatbot data
   - Delete chatbot
   - Chatbot name and description validation and error messages
   - Retreive chatbot data on page init from local storage
   - Header for better ui
   - Chat simulator widget - opens chat on click - for better ux
   - Chatbot name in chat and messages
   - Date and time of sent and received messages
   - Save chat history to local storage
   - Chat history is present until chat clearance 
   - Clear chat button
   - Toastr messages after actions (Create chatbot, update chatbot, delete chatbot, upload file, remove file, clear chat)
   - Tooltips on icons with messages (Remove file, clear chat)


