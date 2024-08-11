'use client'
import { Box, Stack, TextField, Button, Typography } from "@mui/material"
import Image from "next/image";
// state var to store messages
import { useState } from "react"

export default function Home() {
  // to store the convo.
  const [history, setHistory] = useState([])
  // store the input/curr message
  const [message, setMessage] = useState("")

  const firstMessage = "Hi there! I'm the Headstarter virtual assistant. How can I help?"

  
  // send message to chat bot
  const sendMessage = async () => {
    // add user input to history
    setHistory((history) => [ ...history, { role: "user", parts: [{text: message }] }])
    // clear input/curr message
    setMessage('')
    // sending the actual reqest 
    try{
      const responce =await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...history, { role: "user", parts: [{ text: message }] }])
      })

      const data =await responce.json()
      // add model's responce to convo
      setHistory((history) => [...history, {role: "model", parts: [{text: data}] }])
    } catch (error) {
      console.error("error getting chatbot responce:", error)
      setHistory((history) => [...history, { role: "model", parts: [{ text: "Oops! Something went wrong. Please try again." }] }])
    }
  }
  


  // temp chatgpt generated UI -->>

  return (
    <Box sx={{   
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black'
    }}>

{/* <div id="wrapper" onClick={function(e){ e.target.tagName == 'TEXTAREA' ? setTyping(true) : setTyping(false)}}>
      <div id="content">
        <img className={"glow eye"} id="left-eye" src="eye.svg"/>
        <img className={typing ? "pupil focused" : "pupil idle"} id="left-pupil" src="pupil.svg"/>
        <img className={"glow eye"} id="right-eye" src="eye.svg"/>
        <img className={typing ? "pupil focused" : "pupil idle"} id="right-pupil" src="pupil.svg"/>
        <form>
          <textarea id="chat" placeholder="How can I help?" ></textarea>
        </form>
      </div>
    </div> */}

      <Box sx={{
        width: '40vw',
        display: 'flexbox', 
        justifyContent: 'center', 
        alignItems: 'center'
      }}>

        {/* Chat History */}
        {/* hard coded in first message  */}
        <Typography>{firstMessage}</Typography>

        {/* using a stack to store chat history vertically.  */}
        <Stack spacing={2} sx={{ mb: 2 }}>
          {/* iterate through stack to display all chats! */}
          {history.map((msg, index) => (
            <Typography key={index} align={msg.role === "user" ? "right" : "left"}>
              {msg.role === "user" ? "You: " : "Bot: "} {msg.parts[0].text}
            </Typography>
          ))}
        </Stack>

        {/* Input Field */}
        <TextField
          fullWidth
          multiline
          rows={5}
          maxRows={5}
          variant="outlined"
          placeholder="Type your message..."

          // input -> message, so that it can display 
          value={message}
          // to update with input
          onChange={(e) => setMessage(e.target.value)}
          // enter key action
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          sx={{
            boxSizing: 'border-box',
            border: '2px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f8f8f8',
            resize: 'none',
            transition: '0.2s',
            "&:hover" : {
              transform: 'translate(-3px, -3px)',
              boxShadow: "3px 3px 0 cyan",
            }
          }}
        />

        {/* Send Button */}
        <Button 
          variant="contained" 
          // call the sendMessage function!
          onClick={sendMessage} 
          sx={{ 
            mt: 1,
            backgroundColor: "transparent",
            border: "1px solid cyan",
            marginTop: '20px',
            float: 'right',
            transition: '0.2s',
            "&:hover" : {
              backgroundColor: 'transparent',
              transform: 'translate(-3px, -3px)',
              boxShadow: "3px 3px 0 cyan",
            }
          }}>
          Send
        </Button>
      </Box>
    </Box>
  )
}
