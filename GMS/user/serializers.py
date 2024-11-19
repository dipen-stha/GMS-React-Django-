from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta: 
        model = User
        fields = ['id','first_name', 'last_name', 'email', 'gender', 'username', 'profile_pic', 'password']

        def __init__(self, *args, **kwargs):
            if self.context.get('request') and self.context.get('request').method in ["GET"]:
                del self.fields['password']
            super().__init__(*args, **kwargs)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        import ipdb;ipdb.set_trace()
        user = User(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user