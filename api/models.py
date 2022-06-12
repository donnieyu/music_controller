from django.db import models
import string
import random

def generate_unique_code():
    length = 6
    # code = ''.join(random.choices(string.ascii_uppercase, k=length))
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    current_song = models.CharField(max_length=50, null=True)
    album_cover = models.CharField(max_length=50, null=True)
    artist_string = models.CharField(max_length=50, null=True)
    title = models.CharField(max_length=50, null=True, default="", unique=False)
