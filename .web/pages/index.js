import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {E, updateState} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Button, Center, Divider, HStack, Heading, Input, VStack} from "@chakra-ui/react"
import NextHead from "next/head"

const EVENT = "http://localhost:8000/event"
export default function Component() {
const [state, setState] = useState({"log_in": false, "password": "", "username": "", "events": [{"name": "state.hydrate"}]})
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
<Center sx={{"width": "100%", "height": "100vh", "background": "radial-gradient(circle at 22% 11%,rgba(150, 175, 217,0.25),hsla(0,0%,100%,0) 19%),radial-gradient(circle at 82% 25%,rgba(174, 242, 232,1),hsla(0,0%,100%,0) 35%),radial-gradient(circle at 25% 61%,rgba(209, 237, 202, 1),hsla(0,0%,100%,0) 55%)"}}>
<VStack sx={{"bg": "white", "padding": "2em", "shadow": "lg", "borderRadius": "lg"}}>
<Heading sx={{"fontSize": "1.5em"}}>
{`adith's chat app`}</Heading>
<HStack sx={{"width": "100%"}}>
<Input placeholder="Username"
type="text"
onBlur={(_e) => Event([E("state.set_user", {text:_e.target.value})])}
sx={{"width": "100%"}}/>
<Input placeholder="Password"
type="password"
onBlur={(_e) => Event([E("state.set_pass", {text:_e.target.value})])}
sx={{"width": "100%"}}/></HStack>
<Button onClick={() => Event([E("state.flip_log_in", {})])}
sx={{"width": "100%"}}>
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