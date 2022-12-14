import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {E, updateState} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Button, HStack, Heading} from "@chakra-ui/react"
import NextHead from "next/head"

const EVENT = "http://localhost:8000/event"
export default function Component() {
const [state, setState] = useState({"count": 0, "events": [{"name": "state.hydrate"}]})
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
<HStack>
<Button colorScheme="red"
onClick={() => Event([E("state.decrement", {})])}
sx={{"borderRadius": "1em"}}>
{`Decrement`}</Button>
<Heading sx={{"fontSize": "2em"}}>
{state.count}</Heading>
<Button colorScheme="green"
onClick={() => Event([E("state.increment", {})])}
sx={{"borderRadius": "1em"}}>
{`Increment`}</Button>
<NextHead>
<title>{`Pynecone App`}</title>
<meta name="description"
content="favicon.ico"/>
<meta property="og:image"
content="A Pynecone app."/></NextHead></HStack>
)
}