import pynecone as pc
import hashlib


class State(pc.State):
    log_in = False
    username = ""
    password = ""
    def flip_log_in(self):
        self.log_in = not self.log_in
    def set_user(self, text):
        self.username = text
    def set_pass(self, text):
        self.password = hashlib.sha256(text)


def index():
    return pc.center(
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
    )


app = pc.App(state=State)
app.add_page(index)
app.compile()
