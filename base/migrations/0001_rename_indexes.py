from django.db import migrations


def named_tuple_fetch_all(cursor):
    "Return all rows from a cursor as a namedtuple"
    from collections import namedtuple

    desc = cursor.description
    Result = namedtuple("Result", [col[0] for col in desc])
    return [Result(*row) for row in cursor.fetchall()]


def rename_indexes(apps, schema_editor):
    from django.db import connection

    with connection.cursor() as cursor:
        cursor.execute(
            """SELECT indexname FROM pg_indexes 
            WHERE tablename LIKE 'base%'"""
        )
        for result in named_tuple_fetch_all(cursor):
            old_index_name = result.indexname
            new_index_name = old_index_name.replace(
                "marketify_", "base_", 1
            )
            cursor.execute(
                f"""ALTER INDEX IF EXISTS {old_index_name} 
                RENAME TO {new_index_name}"""
            )


def rename_foreignkeys(apps, schema_editor):
    from django.db import connection

    with connection.cursor() as cursor:
        cursor.execute(
            """SELECT table_name, constraint_name 
            FROM information_schema.key_column_usage
            WHERE constraint_catalog=CURRENT_CATALOG 
            AND table_name LIKE 'base%'
            AND position_in_unique_constraint notnull"""
        )
        for result in named_tuple_fetch_all(cursor):
            table_name = result.table_name
            old_foreignkey_name = result.constraint_name
            new_foreignkey_name = old_foreignkey_name.replace(
                "marketify_", "base_", 1
            )
            cursor.execute(
                f"""ALTER TABLE {table_name} 
                RENAME CONSTRAINT {old_foreignkey_name} 
                TO {new_foreignkey_name}"""
            )


class Migration(migrations.Migration):

    dependencies = [
        # ("base", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(rename_indexes, migrations.RunPython.noop),
        migrations.RunPython(rename_foreignkeys, migrations.RunPython.noop),
    ]
