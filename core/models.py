from django.db import models

class Creator(models.Model):
  
  PLATFORM_CHOICES = [
    ('Instagram', 'Instagram'),
    ('TikTok', 'TikTok'),
    ('User Generated Content', 'User Generated Content'),
  ]

  name = models.CharField(max_length=255)
  username = models.CharField(max_length=50)
  rating = models.FloatField()
  platform = models.CharField(max_length=40, choices=PLATFORM_CHOICES)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name
  
class Content(models.Model):
  creator = models.ForeignKey(Creator, on_delete=models.CASCADE)
  url = models.URLField()

  def __str__(self):
    return self.url