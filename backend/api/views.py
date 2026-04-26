from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
import json

@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"csrfToken": get_token(request)})

def me(request):
    if request.user.is_authenticated:
        return JsonResponse({
            "authenticated": True,
            "username": request.user.username,
            "email": request.user.email
        })
    return JsonResponse({"authenticated": False})

def register_user(request):
    if request.method != "POST":
        return JsonResponse({'success': False, 'message': 'Invalid request'})

    data = json.loads(request.body)
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # 1. Username exists?
    if User.objects.filter(username=username).exists():
        return JsonResponse({'success': False, 'message': 'Username not valid.'})

    # 2. Email exists?
    if User.objects.filter(email=email).exists():
        return JsonResponse({'success': False, 'message': 'Email not valid.'})

    try:
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)})

def login_user(request):
    if request.method != 'POST':
        return JsonResponse({"success": False, "message": "Invalid request"}, status=400)

    try:
        data = json.loads(request.body)
    except:
        return JsonResponse({"success": False, "message": "Invalid JSON"}, status=400)

    email = data.get("email")
    password = data.get("password")

    # Look up user by email
    user_obj = User.objects.filter(email=email).first()
    if not user_obj:
        return JsonResponse({"success": False, "message": "Invalid email or password"}, status=400)

    # Authenticate using username
    user = authenticate(request, username=user_obj.username, password=password)

    if user is None:
        return JsonResponse({"success": False, "message": "Invalid email or password"}, status=400)

    login(request, user)
    return JsonResponse({"success": True})

def logout_user(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({"success": True})
    return JsonResponse({"success": False, "message": "Invalid request"}, status=400)