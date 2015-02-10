from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings

import djadmin2

djadmin2.default.autodiscover()
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'psychomino.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^admin2/', include(djadmin2.default.urls)),
)
if not settings.DEBUG:
urlpatterns += patterns('',
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)