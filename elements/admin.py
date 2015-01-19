from elements.models import Element

from django.contrib import admin
admin.site.register(Element)

import djadmin2
djadmin2.default.register(Element)
