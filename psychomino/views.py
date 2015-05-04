# coding=utf-8

from django.shortcuts import render
from psychomino.forms import ContactForm
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.http import Http404
from svglib.svglib import SvgRenderer
from reportlab.graphics import renderPDF
from reportlab.graphics import renderSVG
from django.http import HttpResponse
import xml.dom.minidom

def init(request):
    return render(request, 'psychomino/index.html')

def home(request, pk):
	return render(request, 'psychomino/index.html')

def rules(request):
    return render(request, 'psychomino/rules.html')

def rasterizer(request):
    return render(request, 'psychomino/rasterizer.html')

def exportsvg(request):
    output = request.POST.get("output_format")
    svg = request.POST.get("data")
    doc = xml.dom.minidom.parseString(svg.encode( "utf-8" ))
    svg = doc.documentElement
    # Create new instance of SvgRenderer class
    svgTamp = SvgRenderer()
    svgTamp.render(svg)
    drawing = svgTamp.finish()
    if output=="svg" :
        svg = renderSVG.drawToString(drawing)
        response = HttpResponse(content_type='image/svg+xml')
        response.write(svg)     
        response["Content-Disposition"]= "attachment; filename=converted.svg"
    
    if output == "pdf" :
        pdf = renderPDF.drawToString(drawing)
        response = HttpResponse(content_type='application/pdf')
        response.write(pdf)     
        response["Content-Disposition"]= "attachment; filename=converted.pdf"

    return response

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