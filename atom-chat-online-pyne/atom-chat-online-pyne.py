import pynecone as pc
import hashlib


class State(pc.State):
    logged_in = False
    log_in_button = False
    username = ""

    def log_in_on_click(self):
        print(f"username is {self.log_in_username}")

    def flip_log_in_button(self):
        self.log_in_button = not self.log_in_button
        
    def reset_all_button(self):
        self.log_in_button = False
        self.sign_up_button = False

    def flip_sign_up_button(self):
        self.sign_up_button = not self.log_in_button



def index():
    return pc.box(
        pc.box(
            pc.hstack(
                pc.text("adith's Chat App", as_="strong"),
                pc.spacer(),
                pc.box(
                    pc.hstack(
                        pc.link(
                            pc.cond(
                                State.log_in_button,
                                pc.button("Log in", bg="#98ebf5",
                                          is_loading=True,),
                                pc.button("Log in", bg="#98ebf5",
                                          on_click=State.flip_log_in_button),
                            ),
                            href="/log-in",
                            button=True,
                        )
                    )
                ),
                padding="1",
            ),
            bg="#99ff9e",
        ),
        on_focus=State.reset_all_button,

    )


def login():
    return pc.box(
        pc.center(
            pc.vstack(
                pc.heading("adith's chat app", font_size="1.5em"),
                pc.hstack(
                    pc.input(
                        placeholder="Username",
                        width="100%",
                        on_change=State.set_log_in_username,
                    ),
                    pc.input(
                        placeholder="Password",
                        type_="password",
                        width="100%",
                        on_change=State.set_log_in_password,
                    ),
                    width="100%"
                ),
                pc.button(
                    "Log In",
                    width="100%",
                    on_click=State.log_in_on_click,
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
    )


def main_page():
    return pc.box(
        pc.box(
            pc.hstack(
                pc.text("adith's Chat App", as_="strong"),
                pc.spacer(),
                pc.box(
                    pc.hstack(
                        pc.link(
                            pc.cond(
                                State.log_in_button,
                                pc.button("Log in", bg="#98ebf5",
                                          is_loading=True,),
                                pc.button("Log in", bg="#98ebf5",
                                          on_click=State.flip_log_in_button),
                            ),
                            href="/log-in",
                            button=True,
                        )
                    )
                ),
                padding="1",
            ),
            bg="#99ff9e",
        ),
        on_focus=State.reset_all_button,
    )

app = pc.App(state=State)
app.add_page(index, title="adith's Chat App")
app.add_page(login, path="/log-in", title="adith's Chat App: Log in")
app.add_page(main_page, path="/chat")
app.compile()