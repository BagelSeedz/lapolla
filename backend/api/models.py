from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Sheet(models.Model):
    code = models.CharField(max_length=5, unique=True, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

class Prediction(models.Model):
    sheet = models.ForeignKey(Sheet, on_delete=models.CASCADE, null=True, blank=True)
    match_id = models.IntegerField()
    home_score = models.IntegerField()
    away_score = models.IntegerField()

    class Meta:
        unique_together = ('sheet', 'match_id')
