from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from api.serializers import LessonSerializer, BranchSerializer, ElementSerializer
from rest_framework import viewsets
from lessons.models import Lesson, Branch, Element
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer,TemplateHTMLRenderer
from rest_framework.decorators import list_route

class LessonViewSet(viewsets.ModelViewSet):


    serializer_class = LessonSerializer
    renderer_classes = (JSONRenderer, TemplateHTMLRenderer)

    @list_route(methods=['GET'])
    def search(self, request):
        search = request.QUERY_PARAMS.get('search', None)
        lessons = Lesson.objects.filter(lesson_title__icontains=search)
        serializer = LessonSerializer(lessons, many=True)
        if request.accepted_renderer.format == 'html':
            return Response({'lessons': serializer.data}, template_name='lessons/search.html')
        else:
            return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Lesson.objects.all()
        lessons = get_object_or_404(queryset, pk=pk)
        serializer = LessonSerializer(lessons)
        return Response(serializer.data)

    def create(self, request):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk, format=None):
        queryset = Lesson.objects.all()
        lesson = get_object_or_404(queryset, pk=pk)
        serializer = LessonSerializer(lesson, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk, format=None):
        queryset = Lesson.objects.all()
        lesson = get_object_or_404(queryset, pk=pk)
        lesson.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BranchViewSet(viewsets.ModelViewSet):


    serializer_class = BranchSerializer

    def create(self, request):
        serializer = BranchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, pk, format=None):
        queryset = Branch.objects.all()
        branch = get_object_or_404(queryset, pk=pk)
        serializer = BranchSerializer(branch, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, pk, format=None):
        queryset = Branch.objects.all()
        branch = get_object_or_404(queryset, pk=pk)
        branch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ElementViewSet(viewsets.ModelViewSet):

    parser_classes=(FormParser, MultiPartParser,JSONParser)
    serializer_class = ElementSerializer

    def create(self, request):
        serializer = ElementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, pk, format=None):
        queryset = Element.objects.all()
        element = get_object_or_404(queryset, pk=pk)
        serializer = ElementSerializer(element, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, pk, format=None):
        queryset = Element.objects.all()
        element = get_object_or_404(queryset, pk=pk)
        element.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)