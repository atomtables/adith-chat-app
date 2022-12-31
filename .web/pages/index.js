import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {E, updateState} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Box, Button, HStack, Link, Spacer, Text} from "@chakra-ui/react"
import NextLink from "next/link"
import NextHead from "next/head"

const EVENT = "http://localhost:8000/event"
export default function Component() {
const [state, setState] = useState({"current_buffered_message": "", "logged_in": false, "messages": ["Write Code", "Sleep", "Have Fun"], "username": "", "events": [{"name": "state.hydrate"}]})
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
<Box>
<Box sx={{"bg": "#99ff9e"}}>
<HStack sx={{"padding": "1"}}>
<Text as="strong">
{`AtomChat Online`}</Text>
<Spacer/>
<Box>
<HStack>
{state.logged_in ? <HStack>
<Button isDisabled={true}
sx={{"bg": "lightgreen", "color": "black"}}>
{state.username}</Button>
<NextLink passHref={true}
href="/chat">
<Link sx={{"button": true}}>
<Button sx={{"width": "100%"}}>
{`Enter Chat`}</Button></Link></NextLink></HStack> : <NextLink passHref={true}
href="/log-in">
<Link sx={{"button": true}}>
<Button sx={{"bg": "#98ebf5"}}>
{`Log in`}</Button></Link></NextLink>}</HStack></Box></HStack></Box>
<NextHead>
<title>{`AtomChat Online`}</title>
<meta content="favicon.ico"
name="description"/>
<meta content="A Pynecone app."
property="og:image"/></NextHead></Box>
)
}