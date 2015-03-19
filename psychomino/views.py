from django.http import HttpResponse
from django.shortcuts import render

def home(request, pk):
    return render(request, 'psychomino/index.html')