from django.db import migrations

def assign_sheets(apps, schema_editor):
    Prediction = apps.get_model('api', 'Prediction')
    Sheet = apps.get_model('api', 'Sheet')

    for pred in Prediction.objects.all():
        # Assign prediction to the user's first sheet
        sheet = Sheet.objects.filter(user_id=pred.user_id).first()
        pred.sheet_id = sheet.id
        pred.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_sheet_alter_prediction_unique_together_and_more'),
    ]

    operations = [
        migrations.RunPython(assign_sheets),
    ]
