from rest_framework.permissions import BasePermission


#permission checks id donor
class IsDonor(BasePermission):
    def has_permission(self, request, view):

        #creating custom permissin to check authentication and user is donor
        return (
            request.user.is_authenticated
            and request.user.role == 'DONOR'
        )


#permission checks is current req.user is donor to edit/delete
class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):

        #anyone can view(get) the food listing
        if request.method in ['GET','HEAD','OPTIONS']:
            return True

        #if request user object is donor and the current user?, they can edit and delete food list
        #so one cant access other list only Owner edits their own food
        return obj.donor == request.user


class IsReceiver(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == 'RECEIVER'
        )