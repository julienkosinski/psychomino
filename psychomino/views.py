# coding=utf-8

from django.shortcuts import render
from psychomino.forms import ContactForm
from django.core.mail import send_mail
from django.shortcuts import redirect

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
