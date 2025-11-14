import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://wysylywynaervxtcycyw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5c3lseXd5bmFlcnZ4dGN5Y3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwOTMwNDEsImV4cCI6MjA3ODY2OTA0MX0.7-oiVJxPWbYOxS1Twu01ORzyoXj3aJjbHQipGOV-p9g"
);
