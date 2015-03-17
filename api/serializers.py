from rest_framework import serializers
from lessons.models import Lesson, Branch, Element


class ElementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Element
        fields = ('id', 'element_content', 'element_type', 'element_branch', 'pub_date', 'modify_date')
        read_only_fields = ('pub_date')


class BranchSerializer(serializers.ModelSerializer):

    elements = ElementSerializer(many=True, read_only=True)

    class Meta:
        model = Branch
        fields = ('id', 'branch_title', 'branch_lesson', 'pub_date', 'modify_date', 'elements')
        read_only_fields = ('pub_date', 'elements')


class LessonSerializer(serializers.ModelSerializer):

    branches = BranchSerializer(many=True, read_only=True)

    class Meta:
        model = Lesson
        fields = ('id', 'lesson_title', 'pub_date', 'modify_date', 'branches')
        read_only_fields = ('pub_date', 'branches', 'modify_date')
