from django import forms

class ContactForm(forms.Form):
    nom = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'placeholder': 'Nom'}), label='')
    sender = forms.EmailField(widget=forms.TextInput(attrs={'placeholder': 'Email'}), label='')
    message = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Message'}), label='')
