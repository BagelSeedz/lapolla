from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True, primary_key=True)
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)

    def __str__(self):
        return self.name