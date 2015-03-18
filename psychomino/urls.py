from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework.routers import SimpleRouter
from api.views import LessonViewSet, BranchViewSet, ElementViewSet

router = SimpleRouter(trailing_slash=False)
router.register(r'lessons', LessonViewSet, 'lessons')
router.register(r'branches', BranchViewSet, 'branches')
router.register(r'elements', ElementViewSet, 'elements')

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'psychomino.views.home'),
    url(r'^rules/', 'psychomino.views.rules'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls, namespace='api')),
)

urlpatterns += router.urls
