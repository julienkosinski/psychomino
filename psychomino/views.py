# coding=utf-8

from django.shortcuts import render
from psychomino.forms import ContactForm
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.http import Http404

def init(request):
    return render(request, 'psychomino/index.html')

def home(request, pk):
	return render(request, 'psychomino/index.html')

def rules(request):
    return render(request, 'psychomino/rules.html')

def contact(request):
    if request.method == 'POST':  # S'il s'agit d'une requête POST
        form = ContactForm(request.POST)  # Nous reprenons les données

        if form.is_valid(): # Nous vérifions que les données envoyées sont valides

            # Ici nous pouvons traiter les données du formulaire
            nom = form.cleaned_data['nom']
            sender = form.cleaned_data['sender']
            message = form.cleaned_data['message']

            # Nous pourrions ici envoyer l'e-mail grâce aux données que nous venons de récupérer

            send_mail('Psychomino contact. ' + sender , message, sender, ['romain.desajardim@gmail.com'], fail_silently=False)

            return redirect('psychomino.views.home')

    else: # Si ce n'est pas du POST, c'est probablement une requête GET
        form = ContactForm()  # Nous créons un formulaire vide

    return render(request, 'psychomino/contact.html', locals())

def getSvg(request):
    if request.method == 'POST':
        # !!! We don't sanitize data from client. That is bad practise !!! Need to be fix.
        if request.POST.svgAll is None:
            pass
        else:
            print(request.POST.svgAll);
            #Need a response to avoid 500 error.
    else:
        raise Http404