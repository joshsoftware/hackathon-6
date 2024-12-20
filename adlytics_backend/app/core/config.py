from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Ad Performance Analysis App"
    admin_email: str = "rushikesh.markad@joshsoftware.com"
    items_per_user: int = 50

    class Config:
        env_file = ".env"

settings = Settings()
