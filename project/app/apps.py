from django.apps import AppConfig


class AppConfig(AppConfig):
    name = 'app'
    verbose_name = 'User configuration for Profile'

    def ready(self):
        import app.signal
