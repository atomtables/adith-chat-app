import pynecone as pc
import hashlib


class State(pc.State):
    my_string: str = "not activate"

    def increment(self):
        if self.my_string == "not activate":
            self.my_string = "activate"
        else:
            self.my_string = "not activate"


def index():
    return pc.center(
        pc.vstack(
            pc.heading("adith's chat app", font_size="1.5em"),
            pc.hstack(
                pc.input(
                    placeholder="Username",
                    width="100%",
                ),
                pc.input(
                    placeholder="Password",
                    type_="password",
                    width="100%"
                ),
                width="100%"
            ),
            pc.button(
                "log in",
                width="100%",
            ),
            pc.divider(),
            bg="white",
            padding="2em",
            shadow="lg",
            border_radius="lg",
            
        ),
        width="100%",
        height="100vh",
        background="radial-gradient(circle at 22% 11%,rgba(62, 180, 137,.20),hsla(0,0%,100%,0) 19%),radial-gradient(circle at 82% 25%,rgba(33,150,243,.18),hsla(0,0%,100%,0) 35%),radial-gradient(circle at 25% 61%,rgba(250, 128, 114, .28),hsla(0,0%,100%,0) 55%)",
    )


app = pc.App(state=State)
app.add_page(index)
app.compile()
