import pynecone as pc


config = pc.Config(
    app_name="adith_chat_app",
    bun_path="$HOME/.bun/bin/bun",
    db_url="sqlite:///pynecone.db",
    env=pc.Env.DEV,
)
