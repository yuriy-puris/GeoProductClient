import requests
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Address, Coordinates
from .serializers import AddressSerializer, CoordinatesSerializer
from . import services
from .services import service_address, service_coordinate, service_parse_location

class AddressView(APIView):
    
    def get(self, request, format=None):
        # print(services.service_address)
        # service_address.parser_address_moyo()
        # service_address.parser_address_allo()
        # service_address.parser_address_foxtrot()
        
        queryset = Address.objects.all()
        serializer_class = AddressSerializer(queryset, many=True)
        return Response(serializer_class.data)

class CoordinatesView(APIView):

    def get(self, request, format=None):
        service_coordinate.parse_coordinates()

        queryset = Coordinates.objects.all()
        serializer_class = CoordinatesSerializer(queryset, many=True)
        return Response(serializer_class.data)

class ParseLocationView(APIView):

    def get(self, request):
        print(request)
    
    def post(self, request):
        nearest_address = service_parse_location.parse_location(request.data)
        list_address = [i[0] for i in nearest_address]
        shop_list = []

        for point in list_address:
            address = Address.objects.filter(id=point).values_list('shop_id_id')
            shop_list.append(address[0][0])
        
        print(shop_list)
        return Response('success')