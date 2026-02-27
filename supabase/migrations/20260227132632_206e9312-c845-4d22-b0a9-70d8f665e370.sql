
-- Drop existing constraint and add updated one with new mood types
ALTER TABLE public.mood_entries DROP CONSTRAINT IF EXISTS mood_entries_mood_type_check;
ALTER TABLE public.mood_entries ADD CONSTRAINT mood_entries_mood_type_check CHECK (mood_type IN ('happy', 'neutral', 'sad', 'motivated', 'lazy', 'anxious', 'confident'));
