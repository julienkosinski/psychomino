Install the app :

You may want to update your python in Ubuntu with [PyEnv](https://github.com/yyuu/pyenv). I use Python 3.4.2.

Tu update your local requirments :
```pip3 install -r requirments.txt```

Start the server :
```python3 manage.py runserver```

For now this is just the admin wich works so go to the route :
[http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

We will need to implement a true DB system.
We will need to fix unshown datepicker in the admin edition of date although it works with django.contrib.admin but not with djadmin2.