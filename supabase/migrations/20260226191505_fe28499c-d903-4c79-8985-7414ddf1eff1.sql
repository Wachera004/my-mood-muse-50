
-- Create mood_entries table
CREATE TABLE public.mood_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  mood_type TEXT NOT NULL CHECK (mood_type IN ('happy', 'neutral', 'sad')),
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

-- Users can view their own entries
CREATE POLICY "Users can view own mood entries"
ON public.mood_entries FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own entries
CREATE POLICY "Users can create own mood entries"
ON public.mood_entries FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own entries
CREATE POLICY "Users can update own mood entries"
ON public.mood_entries FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own entries
CREATE POLICY "Users can delete own mood entries"
ON public.mood_entries FOR DELETE
USING (auth.uid() = user_id);

-- Index for faster user queries
CREATE INDEX idx_mood_entries_user_id ON public.mood_entries (user_id);
CREATE INDEX idx_mood_entries_created_at ON public.mood_entries (created_at DESC);
