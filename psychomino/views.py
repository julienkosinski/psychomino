from django.http import HttpResponse
from django.shortcuts import render
from selenium import webdriver
from pyvirtualdisplay import Display
from django.contrib.sites.models import Site

def home(request, id):
	try:
		id
	except NameError:
		return render('psychomino/home.html')
	else:
		return render(id, 'psychomino/home.html')

def activate_download(id):
	pass	

def save_and_download_screenshots(id):
	display = Display(visible=0, size=(1960, 1120))
	display.start()
	browser = webdriver.Firefox()
	current_site = Site.objects.get_current()
	
	id = 1
	browser.get('http://'+current_site.domain+'/api/lessons/'+id)
	
	browser.save_screenshot('screenshot.png')
	browser.quit()
	display.stop()

def home(request):
    return render(request, 'psychomino/home.html')

def rules(request):
    return render(request, 'psychomino/rules.html')
