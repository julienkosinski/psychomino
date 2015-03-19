from django.http import HttpResponse
from django.shortcuts import render
from selenium import webdriver
from pyvirtualdisplay import Display
from django.contrib.sites.models import Site

def activate_download(id):
	pass	

def save_and_download_screenshots(pk):
	display = Display(visible=0, size=(1960, 1120))
	display.start()
	browser = webdriver.Firefox()
	current_site = Site.objects.get_current()
	
	browser.get('http://'+current_site.domain+'/api/lessons/'+pk)
	
	browser.save_screenshot('/static/images/screenshot'+pk+'.png')
	browser.quit()
	display.stop()

def init(request):
    return render(request, 'psychomino/index.html')

def home(request, pk):
    return render(request, 'psychomino/index.html')

def rules(request):
    return render(request, 'psychomino/rules.html')
