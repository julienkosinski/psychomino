from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework.routers import SimpleRouter
from django.conf import settings
from django.conf.urls.static import static
from api.views import LessonViewSet, BranchViewSet, ElementViewSet

router = SimpleRouter(trailing_slash=False)
router.register(r'lessons', LessonViewSet, 'lessons')
router.register(r'branches', BranchViewSet, 'branches')
router.register(r'elements', ElementViewSet, 'elements')

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'psychomino.views.init'),
    url(r'^$', 'psychomino.views.home'),
    url(r'^rules/', 'psychomino.views.rules'),
    url(r'^contact/', 'psychomino.views.contact'),
    url(r'^rasterizer/', 'psychomino.views.rasterizer'),
    url(r'^(?P<pk>\d+)$', 'psychomino.views.home'),
    url(r'^exportsvg/', 'psychomino.views.exportsvg'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^getSvg/', 'psychomino.views.getSvg'),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls, namespace='api')),
)+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += router.urls
