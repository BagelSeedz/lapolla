from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Sheet(models.Model):
    code = models.CharField(max_length=5, unique=True, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

class Prediction(models.Model):
    sheet = models.ForeignKey(Sheet, on_delete=models.CASCADE, null=True, blank=True)
    match_id = models.IntegerField()
    home_score = models.IntegerField(null=True, blank=True)
    away_score = models.IntegerField(null=True, blank=True)

    class Meta:
        unique_together = ('sheet', 'match_id')

class Announcement(models.Model):
    message = models.TextField()  # long messages allowed
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="announcements"
    )
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"Announcement #{self.id}"

class Score(models.Model):
    match_id = models.IntegerField()
    home_score = models.IntegerField(null=True, blank=True)
    away_score = models.IntegerField(null=True, blank=True)