from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterEmployeeView, UserView, LoginView, EmployeesListView

urlpatterns = [
    path('register', RegisterEmployeeView.as_view(), name='register-employee'),
    path('get-user', UserView.as_view(), name='get-user'),
    path('login', LoginView.as_view(), name='login'),
    path('refresh-token', TokenRefreshView.as_view(), name='refresh'),
    path('employees', EmployeesListView.as_view())
]