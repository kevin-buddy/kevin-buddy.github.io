import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  demo_url?: string;
  github_url?: string;
  image?: string; // Change to string if you plan to use an image URL
  isProprietary?: boolean;
}

export async function GET(req: NextRequest) {
    let isSuccess = true;
    let isSupabaseConfigured = true;
    let errorMsg = "";
    if (!supabase) {
        isSuccess = false;
        isSupabaseConfigured = false;
        errorMsg = "Supabase client is not configured. Please check your environment variables.";
    }

    try {
        const { data, error } = await supabase
            .from('personal_project_portfolio')
            .select('*')
            .order('id', { ascending: true }); // Orders by your ID column

        if (error) {
            console.error('Error fetching projects from Supabase:', error);
            
            // If table doesn't exist (commonly Postgres error code 42P01)
            if (error.code === '42P01') {
                isSuccess = false;
                isSupabaseConfigured = true;
                errorMsg = 'Table portfolio does not exist in your Supabase database.';
            }
        }

        return NextResponse.json({
            success: isSuccess,
            supabaseConfigured: isSupabaseConfigured,
            error: errorMsg,
            data: data as Project[],
        });
    } catch (err: any) {
        console.error('Unhandled API exception:', err);
        return NextResponse.json({
            success: false,
            supabaseConfigured: true,
            error: err.message || 'Unknown error occurred while fetching from Supabase.',
        });
    }
}