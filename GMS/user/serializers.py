from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta: 
        model = User
        fields = ['id','first_name', 'last_name', 'email', 'gender', 'username', 'profile_pic']

        def __init__(self, *args, **kwargs):
            import ipdb;ipdb.set_trace()
            if self.request.action == 'list':
                self.fields['password']
            super().__init__(*args, **kwargs)