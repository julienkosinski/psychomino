from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return render(request, 'psychomino/home.html')

def rules(request):
    return render(request, 'psychomino/rules.html')