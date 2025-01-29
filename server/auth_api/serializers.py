from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["image","id","username","email","password","role"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.set_password()
        return user


class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['id'] = user.id
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = user.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        
        if self.user.role == 'Admin':
            raise AuthenticationFailed("Admins are not allowed to log in here.", code="authorization_error")
        
        image_url = self.user.image.url if self.user.image and hasattr(self.user.image, 'url') else None
        
        data['user'] = {
            'id': self.user.id,
            "image": image_url,
            'username': self.user.username,
            'email': self.user.email,
            'role': self.user.role,
        }
        return data
