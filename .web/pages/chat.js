import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {E, updateState} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Box, Button, HStack, Link, Spacer, Text} from "@chakra-ui/react"
import NextLink from "next/link"
import NextHead from "next/head"

const EVENT = "http://localhost:8000/event"
export default function Component() {
const [state, setState] = useState({"log_in": false, "log_in_button": false, "log_in_password": "", "log_in_username": "", "sign_up_button": false, "events": [{"name": "state.hydrate"}]})
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
<Box onFocus={() => Event([E("state.reset_all_button", {})])}>
<Box sx={{"bg": "#99ff9e"}}>
<HStack sx={{"padding": "1"}}>
<Text as="strong">
{`adith's Chat App`}</Text>
<Spacer/>
<Box>
<HStack>
<NextLink href="/log-in"
passHref={true}>
<Link sx={{"button": true}}>
{state.log_in_button ? <Button isLoading={true}
sx={{"bg": "#98ebf5"}}>
{`Log in`}</Button> : <Button onClick={() => Event([E("state.flip_log_in_button", {})])}
sx={{"bg": "#98ebf5"}}>
{`Log in`}</Button>}</Link></NextLink></HStack></Box></HStack></Box>
<NextHead>
<title>{`Pynecone App`}</title>
<meta name="description"
content="favicon.ico"/>
<meta content="A Pynecone app."
property="og:image"/></NextHead></Box>
)
}