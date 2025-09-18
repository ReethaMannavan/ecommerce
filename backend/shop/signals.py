from django.conf import settings
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

User = get_user_model()


# Signal: Send emails after a new user is created
@receiver(post_save, sender=User)
def send_welcome_and_notification_email(sender, instance, created, **kwargs):
    if created:
        # 1️⃣ Welcome email to the user
        send_mail(
            subject="🎉 Welcome to Our E-Commerce!",
            message=f"Hi {instance.username},\n\nThank you for registering at our store. We're excited to have you!",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[instance.email],
            fail_silently=False,
        )

        # 2️⃣ Notification email to host/admin
        send_mail(
            subject="📩 New User Registered",
            message=f"A new user has registered.\n\nUsername: {instance.username}\nEmail: {instance.email}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],  # or another admin email
            fail_silently=False,
        )
