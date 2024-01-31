from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Note
from api.serializer import NoteSerializer

@api_view(['GET'])
def getRoute(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['GET'])
def getNotes(request):
    try:
        notes = Note.objects.all()
        serialized_notes = NoteSerializer(notes, many=True).data
        return Response(serialized_notes)
    except:
        return Response({'message': 'No notes found'})

@api_view(['GET'])
def getNote(request,id):
    # if you want to use query params instead of url params
    # id = request.query_params['id']
    try:
        note = Note.objects.get(id=id)
        serialized_notes = NoteSerializer(note, many=False).data
        return Response({'notes': serialized_notes})
    except:
        return Response({'message': 'Note not found'})
    
@api_view(['POST'])
def createNote (request):
    data = request.data
    note = Note.objects.create(
        body = data['body']
    )
    serialized_note = NoteSerializer(note, many=False).data
    return Response(serialized_note)