from django.shortcuts import render

# Create your views here.
def index(request):
	print("come")
	return render(request,'index.html')