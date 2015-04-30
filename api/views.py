from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from api.serializers import LessonSerializer, BranchSerializer, ElementSerializer
from rest_framework import viewsets
from lessons.models import Lesson, Branch, Element
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer,TemplateHTMLRenderer
import svgwrite
from rest_framework.decorators import list_route
import json
from django.conf import settings

class LessonViewSet(viewsets.ModelViewSet):


    serializer_class = LessonSerializer
    renderer_classes = (JSONRenderer, TemplateHTMLRenderer)

    # Old attemps, just keep it while I tests our last solution.
    '''
    def svg_create(self, datas):
        # For a 12pt font in mm : 0,3759 * 12 = 4.5108mm     
        json_test = """{
                        "const": {
                            "width": 45,
                            "branches_height": 18
                        },
                        "elements_height_max": 20,
                        "font_height_by_elements": {
                            "element0": 4.5108,
                            "element1": 4.8867,
                            "element2": 5.2626,
                            "element3": 4.5108
                        }
                    }"""
        settings_blocks = json.loads(json_test)
        base_width = settings_blocks['const']['width']
        base_height = settings_blocks['const']['branches_height']
        height_max = settings_blocks['elements_height_max']

        svg_lasercut = svgwrite.Drawing(str(settings.PROJECT_ROOT)+'/static/test.svg', profile='tiny')
        svg_lasercut.add(svg_lasercut.rect(0,0,base_width,height_max))
        #svg_lasercut.add(svg_lasercut.text.TextArea(0,0,base_width,height_max))
        svg_lasercut.save()

    '''

    def generate_blocks_from_front(self):
        """
            Generate and select the generated parts from d3js plus
        """
        self.svg_blocks_imposition()

    def svg_blocks_imposition(self):
        """
            Select blocks we need and place its in the good order thanks to a packing binary algorithm (or a simple template).
        """
        pass

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
        
        # If we support HTML, then we consider the client is a browser. We will gnerate a svg or pdf file to download in the browser in this case.

        if request.accepted_renderer.format == 'html':
            lesson = serializer.data
            """branches = lesson['branches']
            elements = list()
            for branch in branches:
                for (branch_key,branch_content) in branch.items():
                    if branch_key == 'elements':
                        for each_elements in branch_content:
                            elements.append(each_elements)
                    continue
            lesson.pop('branches', None)"""

            if request.QUERY_PARAMS.get('format', None) == 'pdf':
                # Then it is a A4 PDF to generate.
                pass
            else:
                # Pick every parts of blocks of texts generated in front in svg
                self.generate_blocks_from_front()
            svg_file = open(str(settings.PROJECT_ROOT)+'/static/test.svg', 'rb')
            response = HttpResponse(FileWrapper(svg_file), content_type='application/svg+xml')
            response['Content-Disposition'] = 'attachment; filename="%s"' % 'test.svg'
            return response
            # return Response({'lesson': lesson, 'branches': branches, 'elements': elements}, template_name='lessons/previews.html')
        else:
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