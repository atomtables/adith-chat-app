import pynecone as pc


class State(pc.State):
    logged_in = False

    username = ""

    messages = ["Write Code", "Sleep", "Have Fun"]
    current_buffered_message = ""

    def flip_logged_in(self):
        self.logged_in = not self.logged_in

    def add_self_made_message(self):
        self.messages += [self.current_buffered_message]

    def on_message_send(self):
        self.messages += self.current_buffered_message
        self.current_buffered_message = ""
        print(self.messages)

    def log_in_on_click(self):
        print(f"username is {self.username}")
        self.logged_in = True

    def on_log_out(self):
        self.logged_in = False
        self.username = ""

    def if_username_empty(self):
        if self.username == "":
            return pc.redirect(
                "/log-in",
            )
        print(self.username)


def get_item(item):
    return pc.list_item(
        pc.hstack(
            pc.text(item, font_size="1.25em"),
        ),
    )


def index():
    return pc.box(
        pc.box(
            pc.hstack(
                pc.text("AtomChat Online", as_="strong"),
                pc.spacer(),
                pc.box(
                    pc.hstack(
                        pc.cond(
                            State.logged_in,
                            pc.hstack(
                                pc.button(
                                    State.username,
                                    bg="lightgreen",
                                    color="black",
                                    is_disabled=True,
                                ),
                                pc.link(
                                    pc.button(
                                        "Enter Chat",
                                        width="100%",
                                    ),
                                    href="/chat",
                                    button=True,
                                ),
                            ),
                            pc.link(
                                pc.button("Log in", bg="#98ebf5"),
                                href="/log-in",
                                button=True,
                            ),
                        ),
                    )
                ),
                padding="1",
            ),
            bg="#99ff9e",
        ),

    )


def login():
    return pc.box(
        pc.center(
            pc.vstack(
                pc.heading("AtomChat", font_size="1.5em"),
                pc.hstack(
                    pc.input(
                        placeholder="Username",
                        width="100%",
                        on_change=State.set_username,
                    ),
                    width="100%"
                ),
                pc.hstack(
                    pc.link(
                        pc.button(
                            "Log In",
                            width="100%",
                            on_click=State.log_in_on_click,
                        ),
                        href="/chat",
                        button=True,
                    ),
                    pc.spacer(),
                    pc.link(
                        pc.button(
                            "Return",
                            width="100%",
                        ),
                        href="/",
                        button=True,
                    ),
                ),
                bg="white",
                padding="2em",
                shadow="lg",
                border_radius="lg",

            ),
            width="100%",
            height="100vh",
            background="radial-gradient(circle at 22% 11%,rgba(150, 175, 217,0.25),hsla(0,0%,100%,0) 19%),"
                       "radial-gradient(circle at 82% 25%,rgba(174, 242, 232,1),hsla(0,0%,100%,0) 35%),"
                       "radial-gradient(circle at 25% 61%,rgba(209, 237, 202, 1),hsla(0,0%,100%,0) 55%)",
        ),
    )


def main_page():
    return pc.box(
        pc.box(
            pc.hstack(
                pc.text("AtomChat Online", as_="strong"),
                pc.spacer(),
                pc.box(
                    pc.hstack(
                        pc.button(
                            State.username,
                            bg="lightgreen",
                            color="black",
                            is_disabled=True,
                        ),
                        pc.link(
                            pc.button(
                                "Log Out",
                                width="100%",
                                on_click=State.on_log_out,
                            ),
                            href="/log-in",
                            button=True,
                        ),
                    )
                ),
                padding="1",
            ),
            bg="#99ff9e",
        ),
    )


app = pc.App(state=State)
app.add_page(index, title="AtomChat Online")
app.add_page(login, path="/log-in", title="Log In | AtomChat Online")
app.add_page(main_page, path="/chat", title="Chat | AtomChat Online")
app.compile()
