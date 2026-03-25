CREATE POLICY "Authenticated users can insert templates"
ON public.templates
FOR INSERT
TO authenticated
WITH CHECK (true);