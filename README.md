[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/julienkosinski/psychomino?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Install the app

## Update to last python version **Python 3.4.2** (facultative)

### On linux

- Install [PyEnv](https://github.com/yyuu/pyenv):
```
$ curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
```
- Update your ```~/.bash_profile```, with vim for example:
```
$ vim ~/.bash_profile
```
Add to it:
```
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```
- Open a new terminal or type ```source ~/.bash_profile```
- Install the last two versions:
```
$ pyenv install 3.4.2
```
```
$ pyenv install 2.7.9
```
- Activate the versions, default one is the first but we can use the two in parallel specifying the version like with the command: ```python2``` or ```python3```.
Here, python3 will be default one:
```
$ pyenv global 3.4.2 2.7.9
```

### On MacOS

- Install [Homebrew](http://brew.sh/):
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- Install Python 3.4.2 with it:
```
brew install python3
```

### On Windows

- Just download and install it here:
 
[Python 3.4.2 for Windows](https://www.python.org/ftp/python/3.4.2/python-3.4.2.msi)

## To update your local requirments
```
$ pip3 install -r requirments.txt
```

## Start the development server
On master branch:
```
$ python3 manage.py runserver
```

## Add the .env
- Rename ```.env.example``` to ```.env``` file and make it so it fits your needs :-).

## Git branches as environments
- ```master``` is the unstable developement branch
- ```staging``` is a preproduction branch, it allows safe testing. Generally, this is a copy of production not associated with a persistent server yet.
- ```production``` is automatically associated with the production server. If you commit here, the server is updated. I bet on git and github safety (because this is not really a big deal right now :-)).

## TODO
For now this is just the admin wich works so go to the route :
[http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

Or for the other interface made with bootstrap and more extensible (but with a lack of datepicker right now) :
[http://127.0.0.1:8000/admin2/](http://127.0.0.1:8000/admin2/)

We will have to choose between the two.

We will need to implement a true DB system.

We will need to fix unshown datepicker in the admin edition of date although it works with django.contrib.admin but not with djadmin2.


Env Template base : [django-project-template](https://github.com/jpadilla/django-project-template)
