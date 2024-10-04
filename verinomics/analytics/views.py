from django.shortcuts import render
from .models import PageView
from django.db.models import Count

def page_stats(request):
    # Query for total number of page views
    total_views = PageView.objects.count()

    # Query for page views grouped by page URL
    views_per_page = PageView.objects.values('page_url').annotate(view_count=Count('id')).order_by('-view_count')

    # Query for page views grouped by user
    views_per_user = PageView.objects.values('user__username').annotate(user_view_count=Count('id')).order_by('-user_view_count')

    context = {
        'total_views': total_views,
        'views_per_page': views_per_page,
        'views_per_user': views_per_user,
    }

    return render(request, 'page_views.html', context)
