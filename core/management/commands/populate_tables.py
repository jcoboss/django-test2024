import json
from django.core.management.base import BaseCommand
from core.models import Creator, Content

class Command(BaseCommand):
  help = 'Populate Creator and Content tables from creators.json'

  def handle(self, *args, **options):
    with open('./core/static/creators.json') as file:
      data = json.load(file)

    for record in data:
      creator = Creator.objects.create(
        name=record['name'],
        username=record['username'],
        platform=record['platform'],
        rating=record['rating'],
      )

      content = Content.objects.create(
        creator=creator,
        url=record['content'],
      )
      creator.save()
      content.save()

    self.stdout.write(self.style.SUCCESS('Data imported successfully!'))