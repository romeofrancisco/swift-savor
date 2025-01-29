
from rest_framework import generics
from .serializers import UserSerializer, LoginSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User

class RegisterEmployeeView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class UserView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = self.request.user  
        serializer = self.get_serializer(user)
        return Response(serializer.data)

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
    
class EmployeesListView(generics.ListCreateAPIView):
    pagination_class = None
    queryset = User.objects.filter(role="Employee")
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

        
    
