import pynecone as pc

class State(pc.State):
    count: int = 0

def increment(self):
    self.count += 1

def decrement(self):
    self.count -= 1

def index():
    return pc.Hstack(
        pc.Button(
            "Decrement",
            color_scheme="red",
            border_radius="1em",
            on_click=State.decrement,
        ),
        pc.Heading(State.count, font_size="2em"),
        pc.Button(
            "Increment",
            color_scheme="green",
            border_radius="1em",
            on_click=State.increment,
        ),
    )
app = pc.App(state=State)
app.add_page(index)

# finish the app

app.compile()

