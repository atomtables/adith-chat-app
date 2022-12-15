import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {E, updateState} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Button, Center, Divider, HStack, Heading, Input, VStack} from "@chakra-ui/react"
import NextHead from "next/head"

const EVENT = "http://localhost:8000/event"
export default function Component() {
const [state, setState] = useState({"my_string": "not activate", "events": [{"name": "state.hydrate"}]})
const [result, setResult] = useState({"state": null, "events": [], "processing": false})
const router = useRouter()
const Event = events => setState({
  ...state,
  events: [...state.events, ...events],
})
useEffect(() => {
  const update = async () => {
    if (result.state != null) {
      setState({
        ...result.state,
        events: [...state.events, ...result.events],
      })
      setResult({
        state: null,
        events: [],
        processing: false,
      })
    }
    await updateState(state, result, setResult, EVENT, router)
  }
  update()
})
return (
<Center sx={{"width": "100%", "height": "100vh", "background": "radial-gradient(circle at 22% 11%,rgba(62, 180, 137,.20),hsla(0,0%,100%,0) 19%),radial-gradient(circle at 82% 25%,rgba(33,150,243,.18),hsla(0,0%,100%,0) 35%),radial-gradient(circle at 25% 61%,rgba(250, 128, 114, .28),hsla(0,0%,100%,0) 55%)"}}>
<VStack sx={{"bg": "white", "padding": "2em", "shadow": "lg", "borderRadius": "lg"}}>
<Heading sx={{"fontSize": "1.5em"}}>
{`adith's chat app`}</Heading>
<HStack sx={{"width": "100%"}}>
<Input placeholder="Username"
type="text"
sx={{"width": "100%"}}/>
<Input placeholder="Password"
type="password"
sx={{"width": "100%"}}/></HStack>
<Button sx={{"width": "100%"}}>
{`log in`}</Button>
<Divider/></VStack>
<NextHead>
<title>{`Pynecone App`}</title>
<meta content="favicon.ico"
name="description"/>
<meta content="A Pynecone app."
property="og:image"/></NextHead></Center>
)
}