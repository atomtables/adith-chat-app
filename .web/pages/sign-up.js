import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {E, updateState} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Center} from "@chakra-ui/react"
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
<Center>
{`
        pc.vstack(
            pc.heading("adith's chat app", font_size="1.5em"),
            pc.hstack(
                pc.input(
                    placeholder="Username",
                    width="100%",
                    on_blur=State.set_user,
                ),
                pc.input(
                    placeholder="Password",
                    type_="password",
                    width="100%",
                    on_blur=State.set_pass,
                ),
                width="100%"
            ),
            pc.button(
                "log in",
                width="100%",
                on_click=State.flip_log_in,
            ),
            pc.divider(),
            bg="white",
            padding="2em",
            shadow="lg",
            border_radius="lg",

        ),
        width="100%",
        height="100vh",
        background="radial-gradient(circle at 22% 11%,rgba(150, 175, 217,0.25),hsla(0,0%,100%,0) 19%),radial-gradient(circle at 82% 25%,rgba(174, 242, 232,1),hsla(0,0%,100%,0) 35%),radial-gradient(circle at 25% 61%,rgba(209, 237, 202, 1),hsla(0,0%,100%,0) 55%)",
        `}
<NextHead>
<title>{`adith's Chat App: Sign up`}</title>
<meta name="description"
content="favicon.ico"/>
<meta content="A Pynecone app."
property="og:image"/></NextHead></Center>
)
}