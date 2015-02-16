from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings

import djadmin2

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'psychomino.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('rest_framework.urls', namespace='rest_framework')),
)