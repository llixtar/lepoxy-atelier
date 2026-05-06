const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAdmin() {
    const { data, error } = await supabase
        .from('Profile')
        .select('*')
        .eq('role', 'admin');
    
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Admin users:', data);
    }
}

checkAdmin();
