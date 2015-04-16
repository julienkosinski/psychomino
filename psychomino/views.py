from django.shortcuts import render

def init(request):
    return render(request, 'psychomino/index.html')

def home(request, pk):
    return render(request, 'psychomino/index.html')

def rules(request):
    return render(request, 'psychomino/rules.html')

def contact(request):
    return render(request, 'psychomino/contact.html')
