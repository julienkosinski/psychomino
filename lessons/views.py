from django.shortcuts import render
from rest_framework.test import APITestCase.client.get as get
from django.core.urlresolvers import reverse

"""
class HandleLessonsDatas(get):

	def index():
		

	def get_datas_json():
		current_id = get_current_id()
		json_current_lesson = get('/api/lessons/'+current_id).data

		return json_current_lesson

	def get_current_id():
		current_url = request.get_full_path().strip('/')

		return current_url[current_url.len()-1]

	def blocks_adjustments():
		# The goal is to avoid alone block in line. If it is so, reduce font of the longer text or reduce image.

	def blocks_imposition():
		# Use Masonry or FreeWall, generate a rendering with the api rest-framework in HTML.  or .pdf. 
"""