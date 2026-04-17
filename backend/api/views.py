from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse

def me(request):
    if request.user.is_authenticated:
        return JsonResponse({
            "authenticated": True,
            "username": request.user.username,
            "email": request.user.email
        })
    return JsonResponse({"authenticated": False})

def register_user(request):
    try:
        user = User.objects.create_user(
            username=request.POST['email'],
            email=request.POST['email'],
            password=request.POST['password']
        )
        return JsonResponse({'success': True, 'username': user.username})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)})

def login_user(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "message": "Invalid email or password"})

    return JsonResponse({"success": False, "message": "Invalid request"})