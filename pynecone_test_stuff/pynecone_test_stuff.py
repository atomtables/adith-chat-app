import pynecone as pc


class State(pc.State):
    my_string = "deez nuts"
    def onCreateDisWork():
        pc.createElement(heading, "hello")

def index():
    return pc.center(
        pc.heading(State.my_string),
        pc.spacer(),
        pc.heading("This is my python webpage"),
        pc.button("button", onclick=State.onCreateDisWork)
        
    )


app = pc.App(state=State)
app.add_page(index)
app.compile()