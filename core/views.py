from django.http import HttpResponse
from django.template import Context
from django.template.loader import get_template
from core.models import Content
from django.http import JsonResponse
from django.core.paginator import Paginator
from django.http import JsonResponse

def getContent(request):
    contentList = Content.objects.all().select_related('creator').values('url', 'creator__username')[:30]
    template = get_template("content.html")
    html = template.render({
      "pageName": "Content",
      "title": "Content records: url, creator name",
      "results": contentList
      })
    return HttpResponse(html)

def getContentJson(request):
  page_size = request.GET.get('page_size')
  page_number = request.GET.get('page')
  filter = request.GET.get('filter', '') # Instagram, TikTok, User Generated Content
  preSelection = Content.objects.all().select_related('creator')
  if (len(filter) > 0):
    preSelection = preSelection.filter(creator__platform=filter)
  preResult = preSelection.values('url', 'creator__name', 'creator__rating')
  if page_size is not None and page_number is not None:
    paginator = Paginator(preResult, page_size)  # Change the number to the desired page size
    page_obj = paginator.get_page(page_number)
    preResult = list(page_obj)
  else:
    preResult = list(preResult)
  return JsonResponse(preResult, safe=False)

def getHome(request):
    template = get_template("home.html")
    html = template.render()
    return HttpResponse(html)

def getFilter(request):
    template = get_template("filter.html")
    html = template.render()
    return HttpResponse(html)