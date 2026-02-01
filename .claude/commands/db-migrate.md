# Supabase Database Migration

Apply schema changes to Supabase database.

## Instructions

1. Check if schema.sql file exists and read it

2. Explain the migration process:
   - This project uses manual SQL execution (no automated migrations)
   - Changes must be applied via Supabase Dashboard
   - URL: https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd

3. Guide the user through manual migration:
   - Read schema.sql to show what changes will be applied
   - Copy the SQL statements
   - Navigate to: Supabase Dashboard > SQL Editor
   - Paste and run the SQL
   - Verify tables/policies were created

4. Common migration tasks:
   - Creating new tables
   - Adding RLS policies
   - Creating indexes
   - Adding triggers
   - Updating table schemas

5. Verification steps:
   - Check table exists: `SELECT * FROM [table_name] LIMIT 1;`
   - Check RLS policies: View in Dashboard > Authentication > Policies
   - Test from app: Verify CRUD operations work

6. Rollback procedure if needed:
   - Keep backup of previous schema
   - Drop new tables/policies if migration fails
   - Document rollback SQL in comments

## Notes

- Always test RLS policies after migration
- Verify auth.uid() checks work correctly
- Check that anon key can only read public data
- Service role key should NEVER be exposed to client

## Current Schema

Tables:
- comments (user_id, restaurant_id, content, created_at, updated_at)

RLS Policies:
- SELECT: true (anyone can read)
- INSERT: auth.uid() = user_id
- UPDATE: auth.uid() = user_id
- DELETE: auth.uid() = user_id
